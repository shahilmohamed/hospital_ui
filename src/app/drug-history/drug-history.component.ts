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
  showFilters: boolean = false;
  fromDate: Date | null = null;
  toDate: Date | null = null;

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

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onDateChange(): void {

  }

  clearFilters(): void {
    this.fromDate = null;
    this.toDate = null;
    this.getDrugLog(0, 10, '');
  }

  getPage(pageNumber: number): void {
    this.page = pageNumber;
    if (!this.fromDate && !this.toDate) {
      this.getDrugLog(pageNumber - 1, 10, this.value);
    }
  }

  searchFilters(): void {
    if (this.fromDate && this.toDate) {
      const fDate = this.formatDateToLocal(this.fromDate);
      const tDate = this.formatDateToLocal(this.toDate);
      console.log(fDate, tDate);
      let obj = {
        id: this.drug?.id,
        page: 0,
        size: 10,
        search: '',
        fromDate: fDate,
        toDate: tDate
      }
      this.httpService.getFilteredDrugLog(obj).subscribe((res) => {
        this.drugLog = res.data || [];
        this.totalPage = res.totalPage || 0;
        this.value = res.search || '';
      }, (error) => {
        console.error('Error fetching filtered drug log:', error);
        this.drugLog = [];
        this.totalPage = 0;
      });
      
    } else {
      console.log('No date selected');
    }
  }

  formatDateToLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnDestroy(): void {
    document.body.className = '';
    localStorage.removeItem('drug');
  }

}
