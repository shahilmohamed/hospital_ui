import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { HttpService } from '../http.service';
import { Drug } from '../model/Drug';

type ImportRow = {
  rowNumber: number;
  id?: number;
  name: string;
  mrp: number;
  perPieceRate: number;
  quantity: number;
};

type ImportRowError = {
  rowNumber: number;
  message: string;
};

@Component({
  selector: 'app-bulk-import-drugs',
  templateUrl: './bulk-import-drugs.component.html',
  styleUrls: ['./bulk-import-drugs.component.css'],
  standalone: false
})
export class BulkImportDrugsComponent {
  constructor(
    private dialogRef: MatDialogRef<BulkImportDrugsComponent>,
    private snackBar: MatSnackBar,
    private service: HttpService
  ) { }

  selectedFileName: string = '';
  isReadingFile: boolean = false;
  isImporting: boolean = false;

  rows: ImportRow[] = [];
  errors: ImportRowError[] = [];

  updateDrugs: Drug[] = [];
  addDrugs: Drug[] = [];

  // We keep the template very simple so users can create it easily in Excel.
  // Supported headers (case-insensitive):
  // id (optional), name, mrp, perPieceRate, quantity
  expectedHeadersText = 'id, name, mrp, perPieceRate, quantity';

  onClose(): void {
    this.dialogRef.close(false);
  }

  downloadTemplateCsv(): void {
    const headers = ['id', 'name', 'mrp', 'perPieceRate', 'quantity'];
    const sample1 = ['', 'Paracetamol 500mg', '20', '2', '100'];
    const sample2 = ['', 'Amoxicillin 250mg', '120', '12', '50'];

    const csvLines = [
      headers.join(','),
      sample1.join(','),
      sample2.join(',')
    ];

    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'drugs_stock_import_template.csv';
    a.click();

    window.URL.revokeObjectURL(url);
  }

  async onFileSelected(event: any): Promise<void> {
    this.resetPreview();

    const file: File | undefined = event?.target?.files?.[0];
    if (!file) {
      return;
    }

    const name = file.name || '';
    const lower = name.toLowerCase();
    const isExcel = lower.endsWith('.xlsx') || lower.endsWith('.xls');
    if (!isExcel) {
      this.snackBar.open('Please select an Excel file (.xlsx or .xls).', 'Close', { duration: 3000 });
      return;
    }

    this.selectedFileName = name;
    this.isReadingFile = true;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames?.[0];

      if (!sheetName) {
        this.snackBar.open('No worksheet found in the Excel file.', 'Close', { duration: 3000 });
        return;
      }

      const worksheet = workbook.Sheets[sheetName];

      // Read as objects; header row should be first row.
      const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet, {
        defval: '',
        raw: true,
        blankrows: false
      });

      if (!rawRows || rawRows.length === 0) {
        this.snackBar.open('The Excel sheet is empty.', 'Close', { duration: 3000 });
        return;
      }

      const normalized = this.normalizeRawRows(rawRows);
      this.rows = normalized.rows;
      this.errors = normalized.errors;

      if (this.rows.length === 0) {
        this.snackBar.open('No valid rows found. Please check the template headers and data.', 'Close', { duration: 4000 });
      }
    } catch (e) {
      console.error('Error reading Excel file:', e);
      this.snackBar.open('Unable to read the Excel file. Please re-check the file format.', 'Close', { duration: 4000 });
    } finally {
      this.isReadingFile = false;
    }
  }

  resetPreview(): void {
    this.selectedFileName = '';
    this.rows = [];
    this.errors = [];
  }

  private normalizeRawRows(rawRows: any[]): { rows: ImportRow[]; errors: ImportRowError[] } {
    const rows: ImportRow[] = [];
    const errors: ImportRowError[] = [];

    for (let i = 0; i < rawRows.length; i++) {
      const rowNumber = i + 1;
      const raw = rawRows[i] || {};

      // Support any header casing by normalizing keys.
      const obj = this.lowercaseKeys(raw);

      const name = this.toStringValue(obj['name']).trim();
      const mrp = this.toNumberValue(obj['mrp']);
      const perPieceRate = this.toNumberValue(obj['perpiecerate']);
      const quantity = this.toNumberValue(obj['quantity']);
      const id = this.toOptionalNumberValue(obj['id']);

      // Basic validations (beginner-friendly + clear errors)
      if (!name) {
        errors.push({ rowNumber, message: 'Name is required.' });
        continue;
      }
      if (!this.isValidNonNegativeNumber(mrp)) {
        errors.push({ rowNumber, message: 'MRP must be a number (0 or above).' });
        continue;
      }
      if (!this.isValidNonNegativeNumber(perPieceRate)) {
        errors.push({ rowNumber, message: 'Per Piece Rate must be a number (0 or above).' });
        continue;
      }
      if (!this.isValidNonNegativeNumber(quantity)) {
        errors.push({ rowNumber, message: 'Quantity must be a number (0 or above).' });
        continue;
      }

      rows.push({
        rowNumber,
        id: id === undefined ? undefined : id,
        name,
        mrp,
        perPieceRate,
        quantity
      });
    }

    // Duplicate name check inside uploaded file
    const nameMap: Record<string, number> = {};
    for (const r of rows) {
      const key = r.name.trim().toLowerCase();
      nameMap[key] = (nameMap[key] || 0) + 1;
    }
    const hasDuplicates = Object.keys(nameMap).some((k) => nameMap[k] > 1);
    if (hasDuplicates) {
      errors.push({ rowNumber: 0, message: 'Duplicate drug names found in the file. Please keep each name only once.' });
    }

    return { rows, errors };
  }

  private lowercaseKeys(obj: any): any {
    const result: any = {};
    Object.keys(obj || {}).forEach((k) => {
      result[(k || '').toString().trim().toLowerCase()] = obj[k];
    });
    return result;
  }

  private toStringValue(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    return value.toString();
  }

  private toNumberValue(value: any): number {
    if (value === null || value === undefined || value === '') {
      return NaN;
    }
    const num = Number(value);
    return num;
  }

  private toOptionalNumberValue(value: any): number | undefined {
    if (value === null || value === undefined || value === '') {
      return undefined;
    }
    const num = Number(value);
    if (Number.isNaN(num)) {
      return undefined;
    }
    return num;
  }

  private isValidNonNegativeNumber(value: number): boolean {
    if (Number.isNaN(value)) {
      return false;
    }
    return value >= 0;
  }

  formatDateToLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async importNow(): Promise<void> {
    if (this.isReadingFile || this.isImporting) {
      return;
    }

    if (!this.rows || this.rows.length === 0) {
      this.snackBar.open('Please upload an Excel file first.', 'Close', { duration: 3000 });
      return;
    }

    if (this.errors && this.errors.length > 0) {
      this.snackBar.open('Please fix the errors shown before importing.', 'Close', { duration: 4000 });
      return;
    }

    this.isImporting = true;

    try {
      const obj: any = {
        names: this.rows.map((r) => r.name)
      };

      const allDrugsResponse: any = await this.service.getDrugsByName(obj).toPromise();
      const existingDrugs: Drug[] = allDrugsResponse?.data || [];

      const existingByName: Record<string, Drug> = {};
      for (const d of existingDrugs) {
        const key = (d?.name || '').trim().toLowerCase();
        if (key) {
          existingByName[key] = d;
        }
      }

      console.log("existingByName");
      console.log(existingByName);
      console.log("this.rows");
      console.log(this.rows);
      let addedCount = 0;
      let updatedCount = 0;
      const failed: ImportRowError[] = [];

      // Import one-by-one so errors are easy to report.
      for (const r of this.rows) {
        const key = r.name.trim().toLowerCase();
        const existing = existingByName[key];

        const updateDrugs: Drug[] = [];
        const addDrugs: Drug[] = [];
        if (existing) {
          const updateObj: Drug = {
            id: existing.id,
            name: r.name,
            mrp: r.mrp,
            perPieceRate: r.perPieceRate,
            quantity: r.quantity,
            addedDate: existing.addedDate,
            updatedDate: this.formatDateToLocal(new Date())
          };

          this.updateDrugs.push(updateObj);
          updatedCount++;
        } else {
          const addObj: Drug = {
            id: 0,
            name: r.name,
            mrp: r.mrp,
            perPieceRate: r.perPieceRate,
            quantity: r.quantity,
            addedDate: this.formatDateToLocal(new Date()),
            updatedDate: this.formatDateToLocal(new Date())
          };

          this.addDrugs.push(addObj);
          // await this.service.addDrug(addObj).toPromise();
          addedCount++;
        }
      }

      try {
        if (this.updateDrugs.length > 0) {
          await this.service.updateDrugs(this.updateDrugs).toPromise();
        }
        if (this.addDrugs.length > 0) {
          await this.service.addDrugs(this.addDrugs).toPromise();
        }

      }
      catch (e: any) {
        failed.push({
          rowNumber: 0,
          message: e.error.message
        });
      }
      if (failed.length > 0) {
        this.errors = failed;
        this.snackBar.open(`Imported with some errors. Added: ${addedCount}, Updated: ${updatedCount}.`, 'Close', { duration: 5000 });
        return;
      }

      this.snackBar.open(`Import completed. Added: ${addedCount}, Updated: ${updatedCount}.`, 'Close', { duration: 4000 });
      this.dialogRef.close(true);
    } catch (e) {
      console.error('Bulk import error:', e);
      this.snackBar.open('Bulk import failed. Please try again.', 'Close', { duration: 4000 });
    } finally {
      this.isImporting = false;
    }
  }
}

