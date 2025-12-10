import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { CookieService } from 'ngx-cookie-service';
import { Drug } from '../model/Drug';
import { DrugsResponse } from '../model/DrugsResponse';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDrugComponent } from '../update-drug/update-drug.component';

@Component({
  selector: 'app-drugs-details',
  templateUrl: './drugs-details.component.html',
  styleUrls: ['./drugs-details.component.css'],
})
export class DrugsDetailsComponent implements OnInit {
  constructor(
    private service: HttpService,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
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
          this.toastr.info(response.message, 'Info');
        } else if (response.status == 403) {
          this.toastr.error(response.message, 'Error');
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
          this.toastr.info(response.message, 'Info');
        } else if (response.status == 403) {
          this.toastr.error(response.message, 'Error');
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
          this.toastr.success('Drug deleted successfully', 'Success');
          this.refreshComponent();
        },
        (error) => {
          console.error('Error deleting drug:', error);
          this.toastr.error('Unable to delete drug', 'Error');
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

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
