import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { CookieService } from 'ngx-cookie-service';
import { Drug } from '../model/Drug';
import { DrugsResponse } from '../model/DrugsResponse';

@Component({
  selector: 'app-drugs-details',
  templateUrl: './drugs-details.component.html',
  styleUrls: ['./drugs-details.component.css'],
})
export class DrugsDetailsComponent implements OnInit {
  constructor(
    private service: HttpService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    document.body.className = 'bg_background_addNewPatient';
    this.getAllDrugs();
  }

  drugs: Drug[] = [];
  tempDrugs: Drug[] = [];
  value = '';
  p: number = 1;

  getAllDrugs(): void {
    this.service.getAllDrugs().subscribe(
      (response: DrugsResponse) => {
        this.drugs = response.data;
        this.tempDrugs = [...this.drugs];
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

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
