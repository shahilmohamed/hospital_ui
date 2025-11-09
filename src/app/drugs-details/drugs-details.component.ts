import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { CookieService } from 'ngx-cookie-service';
import { Drug } from '../model/Drug';
import { DrugsResponse } from '../model/DrugsResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-drugs-details',
  templateUrl: './drugs-details.component.html',
  styleUrls: ['./drugs-details.component.css'],
})
export class DrugsDetailsComponent implements OnInit {
  constructor(
    private service: HttpService,
    private cookieService: CookieService,
    private toastr: ToastrService
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

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
