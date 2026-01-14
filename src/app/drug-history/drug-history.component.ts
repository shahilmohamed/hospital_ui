import { Component, OnInit, OnDestroy } from '@angular/core';
import { Drug } from '../model/Drug';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-drug-history',
  templateUrl: './drug-history.component.html',
  styleUrls: ['./drug-history.component.css']
})
export class DrugHistoryComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService) { }

  drug: Drug | null = null;
  drugLog: any[] = [];
  totalPage: number = 0;
  page: number = 1;
  value: string = '';

  ngOnInit(): void {
    document.body.className = 'bg_background_addNewPatient';
    this.drug = JSON.parse(localStorage.getItem('drug') || '{}');
    this.getDrugLog(0, 10, '');
  }

  getDrugLog(page: number, size: number, search: string): void {
    let obj = {
      id: this.drug?.id,
      page: page,
      size: size,
      search: search
    }
    this.httpService.getDrugLog(obj).subscribe((res) => {
      this.drugLog = res.data || [];
      this.totalPage = res.totalPage || 0;
      this.value = res.search || '';
    }, (error) => {
      console.error('Error fetching drug log:', error);
      this.drugLog = [];
      this.totalPage = 0;
    });
  }

  getPage(pageNumber: number): void {
    this.page = pageNumber;
    this.getDrugLog(pageNumber - 1, 10, this.value);
  }

  getSearchDrugLog(value: string): void {
    this.value = value;
    this.page = 1;
    this.getDrugLog(0, 10, value);
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
