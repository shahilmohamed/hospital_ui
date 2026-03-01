import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { CookieService } from 'ngx-cookie-service';
import { Drug } from '../model/Drug';
import { DrugsResponse } from '../model/DrugsResponse';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDrugComponent } from '../update-drug/update-drug.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-drugs-details',
    templateUrl: './drugs-details.component.html',
    styleUrls: ['./drugs-details.component.css'],
    standalone: false
})
export class DrugsDetailsComponent implements OnInit {
  constructor(
    private service: HttpService,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    document.body.className = 'bg_background_addNewPatient';
    // this.getAllDrugs();
    this.getDrugPage(0, 10, '');
  }

  drugs: Drug[] = [];
  tempDrugs: Drug[] = [];
  value = '';
  page: number = 1;
  totalPage: number = 0;
  showDeleteDialog: boolean = false;
  selectedDrug: Drug | null = null;

  getAllDrugs(): void {
    this.service.getAllDrugs().subscribe(
      (response: DrugsResponse) => {
        if (response.status == 204) {
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        } else if (response.status == 403) {
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        } else {
          this.drugs = response.data;
          this.tempDrugs = [...this.drugs];
        }
      },
      (error) => {
        console.error('Error fetching drug details:', error);
      }
    );
  }

  onClickSearch(value: string): void {
    const query = value.trim().toLowerCase();

    this.tempDrugs = this.drugs.filter((drug) => {
      return (
        drug.name.toLowerCase().includes(query) || drug.id.toString() === query
      );
    });
    if (!query) {
      this.tempDrugs = [...this.drugs];
      return;
    }
  }

  getPage(pageNumber: number): void {
    this.page = pageNumber;
    this.getDrugPage(pageNumber - 1, 10, this.value);
  }

  getSearchDrug(value: string): void {
    this.value = value;
    this.getDrugPage(0, 10, value);
  }

  getDrugPage(page: number, size: number, search: string): void {
    const obj = { page, size, search };
    this.service.getDrugPage(obj).subscribe(
      (response: DrugsResponse) => {
        if (response.status == 204) {
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        } else if (response.status == 403) {
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        } else {
          this.totalPage = response.totalPage;
          this.drugs = response.data;
          this.tempDrugs = [...this.drugs];
        }
      },
      (error) => {
        console.error('Error fetching drug details:', error);
      }
    );
  }

  async editDrug(drug: Drug): Promise<void> {
    const dialogRef =this.dialog.open(UpdateDrugComponent, {
      width: '600px',
      data: drug,
      panelClass: 'update-drug-dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getDrugPage(0, 10, '');
      }
    });
  }

  deleteDrug(drug: Drug): void {
    this.selectedDrug = drug;
    this.showDeleteDialog = true;
  }

  onCancelDelete(): void {
    this.showDeleteDialog = false;
    this.selectedDrug = null;
  }

  onConfirmDelete(): void {
    if (this.selectedDrug) {
      this.service.deleteDrug(this.selectedDrug).subscribe(
        () => {
          this.snackBar.open('Drug deleted successfully', 'Close', { duration: 3000 });
          this.refreshComponent();
        },
        (error) => {
          console.error('Error deleting drug:', error);
          this.snackBar.open('Unable to delete drug', 'Close', { duration: 3000 });
          this.showDeleteDialog = false;
          this.selectedDrug = null;
        }
      );
    }
  }

  refreshComponent(): void {
    this.page = 1;
    this.value = '';
    this.drugs = [];
    this.tempDrugs = [];
    this.totalPage = 0;
    
    this.showDeleteDialog = false;
    this.selectedDrug = null;
    
    this.getDrugPage(0, 10, '');
  }

  viewDrugHistory(drug: Drug): void {
    localStorage.setItem('drug', JSON.stringify(drug));
    this.router.navigate(['/dashboard/viewDrugHistory']);
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
