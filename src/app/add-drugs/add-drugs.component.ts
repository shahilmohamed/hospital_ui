import { Component, OnInit } from '@angular/core';
import { Drug } from '../model/Drug';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-drugs',
  templateUrl: './add-drugs.component.html',
  styleUrls: ['./add-drugs.component.css'],
})
export class AddDrugsComponent implements OnInit {
  constructor(
    private router: Router,
    private service: HttpService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  onSubmit(f: any) {
    let obj: Drug = {
      id: 0,
      name: f.value.name,
      mrp: f.value.mrp,
      perPiecePrice: f.value.perPiecePrice,
      quantity: f.value.quantity,
      addedDate: this.formatDateToLocal(new Date()),
      updatedDate: this.formatDateToLocal(new Date()),
    };
    this.service.addDrugs(obj).subscribe((response: any) => {
      if (response.message == 'Drugs Added Successfully') {
        this.router.navigate(['/dashboard/viewDrugs']);
      } else {
        alert(response.message);
      }
    });
  }

  formatDateToLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
