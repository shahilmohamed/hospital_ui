import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Drug } from '../model/Drug';
import { DrugsResponse } from '../model/DrugsResponse';
import { Prescription } from '../model/Prescription';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from '../model/Patient';
import { Router } from '@angular/router';

// Interface for bill item
interface BillItem {
  id: number;
  drugName: string;
  mrp: number;
  perPieceRate: number;
  qty: number;
  totalAmount: number;
  drug: Drug;
}

@Component({
  selector: 'app-drug-billing',
  templateUrl: './drug-billing.component.html',
  styleUrl: './drug-billing.component.css',
  standalone: false,
})
export class DrugBillingComponent implements OnInit {
  constructor(
    private service: HttpService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  // Patient and Doctor Info
  patientName: string = '';
  billerName: string = '';
  isFromHistory: boolean = false;
  patientId: number = 0;

  // Drug Search
  drugs: Drug[] = [];
  selectedDrugName: string = '';
  selectedDrugId: number | null = null;
  page: number = 0;
  pageSize: number = 10;
  searchQuery: string = '';
  loading = false;
  searchSubject = new Subject<string>();
  ids: number[] = [];
  selectedDrug: Drug = {
    id: 0,
    name: '',
    mrp: 0,
    perPieceRate: 0,
    quantity: 0,
    addedDate: '',
    updatedDate: ''
  };

  // Bill Items
  billItems: BillItem[] = [];

  ngOnInit(): void {
    document.body.className = 'bg_background_addPrescription';
    this.billerName = localStorage.getItem("name") || '';
    this.loadDrugs();
    this.loadBillingData();

    // Setup search debounce
    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((searchTerm) => {
        if (searchTerm.length >= 2) {
          this.searchQuery = searchTerm;
          this.page = 0;
          this.drugs = [];
          this.loadDrugs();
        } else {
          this.drugs = [];
        }
      });
  }

  // Load billing data from localStorage if coming from medical history
  loadBillingData(): void {
    const billingDataStr = localStorage.getItem('billingData');
    if (billingDataStr) {
      const billingData = JSON.parse(billingDataStr);
      this.patientName = billingData.patientName || '';
      this.patientId = billingData.patientId || 0;
      this.isFromHistory = true;

      // Convert prescription to bill items
      if (billingData.prescription && billingData.prescription.length > 0) {
        this.convertPrescriptionToBillItems(billingData.prescription);
      }

      // Clear localStorage after loading
      localStorage.removeItem('billingData');
    }
  }

  // Convert prescription items to bill items
  convertPrescriptionToBillItems(prescriptions: Prescription[]): void {
    
    const drugIds: number[] = prescriptions.map((prescription) => prescription.id);
    
    this.service.getDrugsByIds({ ids: drugIds }).subscribe(
      (response: any) => {
        if (response.status === 200 && response.data) {
          const drugs: Drug[] = response.data;
          prescriptions.forEach((prescription) => {
            const drug = drugs.find((d) => d.id === prescription.id);
            
            if (drug) {
              let mrng = prescription.dosageMorning ? 1 : 0;
              let aftrn = prescription.dosageAfternoon ? 1 : 0;
              let nght = prescription.dosageNight ? 1 : 0;
              let days = prescription.durationDays;
              let quantity = (mrng + aftrn + nght) * days;
              
              const billItem: BillItem = {
                id: drug.id,
                drugName: drug.name,
                mrp: drug.mrp,
                perPieceRate: drug.perPieceRate,
                qty: quantity ? quantity : 1, 
                totalAmount: parseFloat((drug.perPieceRate * quantity).toFixed(3)) as number,
                drug: drug
              };
              this.billItems.push(billItem);
            }
          });
        }
      },
      (error) => {
        console.error('Error fetching drug details:', error);
      }
    );
  }

  // Load drugs for autocomplete
  loadDrugs(): void {
    if (this.loading) return;
    this.loading = true;
    const payload = {
      page: this.page,
      size: this.pageSize,
      search: this.searchQuery,
    };
    this.service.getSearchDrug(payload).subscribe(
      (response: DrugsResponse) => {
        if (this.page === 0) {
          this.drugs = response.data;
        } else {
          this.drugs = [...this.drugs, ...response.data];
        }
        this.page++;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      }
    );
  }

  // Search drug change handler
  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  // Drug selected from autocomplete
  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedDrug = this.drugs.find(
      (drug) => drug.name === event.option.value
    );
    if (selectedDrug) {
      this.selectedDrugId = selectedDrug.id;
      this.selectedDrugName = selectedDrug.name;
      this.selectedDrug = selectedDrug;
    }
  }

  // Add drug to bill
  addDrugToBill(): void {
    if (!this.selectedDrugName.trim() || !this.selectedDrugId) {
      this.snackBar.open('Please select a drug', 'Close', { duration: 3000 });
      return;
    }

    // Check if drug already exists in bill
    const existingItem = this.billItems.find(
      (item) => item.id === this.selectedDrugId
    );
    if (existingItem) {
      this.snackBar.open('Drug already added. Please update quantity.', 'Close', { duration: 3000 });
      return;
    }

    if (this.selectedDrug.quantity <= 0) {
      this.snackBar.open('Drug quantity is not available', 'Close', { duration: 3000 });
      return;
    }

    const drugItem: BillItem = {
      id: this.selectedDrug.id,
      drugName: this.selectedDrug.name,
      mrp: this.selectedDrug.mrp,
      perPieceRate: this.selectedDrug.perPieceRate,
      qty: 1,
      totalAmount: this.selectedDrug.perPieceRate,
      drug: this.selectedDrug
    }
    this.billItems.push(drugItem);
    this.resetDrugFields();
    this.snackBar.open('Drug added to bill', 'Close', { duration: 3000 });
  }

  // Reset drug selection fields
  resetDrugFields(): void {
    this.selectedDrugName = '';
    this.selectedDrugId = null;
  }

  // Update quantity and recalculate total
  updateQuantity(index: number, quantity: number): void {
    if (quantity < 1) {
      quantity = 1;
    }
    this.billItems[index].qty = quantity;
    this.billItems[index].totalAmount =
      this.billItems[index].perPieceRate * quantity;
  }

  // Remove drug from bill
  removeDrug(index: number): void {
    this.billItems.splice(index, 1);
    this.snackBar.open('Drug removed from bill', 'Close', { duration: 3000 });
  }

  // Calculate total bill amount
  getTotalAmount(): number {
    return parseFloat(this.billItems.reduce((total, item) => total + item.totalAmount, 0).toFixed(3)) as number;
  }

  // Generate bill
  generateBill(): void {
    if (!this.patientName.trim()) {
      this.snackBar.open('Please enter patient name', 'Close', { duration: 3000 });
      return;
    }

    if (!this.billerName.trim()) {
      this.snackBar.open('Please enter biller name', 'Close', { duration: 3000 });
      return;
    }

    if (this.billItems.length === 0) {
      this.snackBar.open('Please add at least one drug', 'Close', { duration: 3000 });
      return;
    }
    
    const billData = {
      items: this.billItems,
      drugInvoice : {
        id: this.patientId,
        patientName: this.patientName,
        billerName: this.billerName,
        totalAmount: this.getTotalAmount(),
        billDate: new Date().toISOString()
      }
    };
    this.service.generateBill(billData).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.router.navigate(['/dashboard']);
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        }
      },
      (error: any) => {
        console.error('Error generating bill:', error);
      }
    );
  }

  // Clear all data
  clearBill(): void {
    this.billItems = [];
    this.patientName = '';
    this.billerName = '';
    this.isFromHistory = false;
    this.patientId = 0;
    this.snackBar.open('Bill cleared', 'Close', { duration: 3000 });
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
