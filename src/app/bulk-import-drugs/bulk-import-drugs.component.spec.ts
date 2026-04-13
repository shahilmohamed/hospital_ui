import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BulkImportDrugsComponent } from './bulk-import-drugs.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../http.service';
import { of } from 'rxjs';

describe('BulkImportDrugsComponent', () => {
  let component: BulkImportDrugsComponent;
  let fixture: ComponentFixture<BulkImportDrugsComponent>;

  const dialogRefMock = {
    close: jasmine.createSpy('close')
  };

  const snackBarMock = {
    open: jasmine.createSpy('open')
  };

  const httpServiceMock = {
    getAllDrugs: jasmine.createSpy('getAllDrugs').and.returnValue(of({ data: [] })),
    addDrugs: jasmine.createSpy('addDrugs').and.returnValue(of({ message: 'Drugs Added Successfully' })),
    updateDrug: jasmine.createSpy('updateDrug').and.returnValue(of({ message: 'Drug Updated Successfully!!!' }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulkImportDrugsComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: HttpService, useValue: httpServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkImportDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resetPreview should clear selected file, rows and errors', () => {
    component.selectedFileName = 'test.xlsx';
    component.rows = [
      { rowNumber: 2, name: 'Test', mrp: 10, perPieceRate: 1, quantity: 5 }
    ];
    component.errors = [{ rowNumber: 2, message: 'Error' }];

    component.resetPreview();

    expect(component.selectedFileName).toBe('');
    expect(component.rows.length).toBe(0);
    expect(component.errors.length).toBe(0);
  });

  it('importNow should show message when rows are empty', async () => {
    component.rows = [];
    component.errors = [];

    await component.importNow();

    expect(snackBarMock.open).toHaveBeenCalled();
  });

  it('importNow should block when errors exist', async () => {
    component.rows = [
      { rowNumber: 2, name: 'Test', mrp: 10, perPieceRate: 1, quantity: 5 }
    ];
    component.errors = [{ rowNumber: 2, message: 'Bad row' }];

    await component.importNow();

    expect(httpServiceMock.getAllDrugs).not.toHaveBeenCalled();
    expect(snackBarMock.open).toHaveBeenCalled();
  });

  it('downloadTemplateCsv should create an object url', () => {
    const oldCreateObjectURL = window.URL.createObjectURL;
    const oldRevokeObjectURL = window.URL.revokeObjectURL;

    (window.URL.createObjectURL as any) = jasmine.createSpy('createObjectURL').and.returnValue('blob:test');
    (window.URL.revokeObjectURL as any) = jasmine.createSpy('revokeObjectURL');

    component.downloadTemplateCsv();

    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();

    window.URL.createObjectURL = oldCreateObjectURL;
    window.URL.revokeObjectURL = oldRevokeObjectURL;
  });
});

