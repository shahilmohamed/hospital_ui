import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Invoice } from '../model/Invoice';
import * as bootstrap from 'bootstrap';
import { InvoiceItem } from '../model/InvoiceItem';

@Component({
  selector: 'app-invoice-details',
  standalone: false,
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css',
})
export class InvoiceDetailsComponent implements OnInit{
  constructor(private http: HttpService) { }
  invoices: Invoice[] = [];
  value = '';
  page: number = 1;
  totalPage: number = 0;
  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;
  selectedInvoiceItems: InvoiceItem[] = [];
  selectedInvoiceNumber: string = '';
  itemsPage: number = 1;
  totalItemsOfInvoice: number = 0;

  ngOnInit(): void {
    document.body.className = 'bg_background_addPrescription';
    this.getAllInvoicesPage(0, 10, '');
  }

  viewInvoiceDetails(invoice: Invoice): void {
    this.itemsPage = 1;
    this.selectedInvoiceItems = invoice.invoiceItems;
    this.selectedInvoiceNumber = invoice.invoiceNumber;
    this.totalItemsOfInvoice = invoice.invoiceItems.length;
    const modal = document.getElementById('invoiceDetailsModal');
    if (modal) new bootstrap.Modal(modal).show();
  }

  getAllInvoicesPage(page: number, size: number, search: string): void {
    const obj = { page, size, search };
    this.http.getAllInvoicesPage(obj).subscribe((res: any) => {
      this.invoices = res.data;
      this.totalPage = res.totalPage;
      this.currentPage = res.currentPage;
      this.totalItems = res.totalItems;
      this.itemsPerPage = res.itemsPerPage;
    });
  }

  getPage(pageNumber: number): void {
    this.page = pageNumber;
    this.getAllInvoicesPage(pageNumber - 1, 10, this.value);
  }
  pageChangeItems(pageNumber: number): void {
    this.itemsPage = pageNumber;
  }
}
