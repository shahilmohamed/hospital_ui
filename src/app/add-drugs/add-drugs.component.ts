import { Component, OnInit, Inject } from '@angular/core';
import { Drug } from '../model/Drug';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-add-drugs',
    templateUrl: './add-drugs.component.html',
    styleUrls: ['./add-drugs.component.css'],
    standalone: false
})
export class AddDrugsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddDrugsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private service: HttpService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit(f: any) {
    let obj: Drug = {
      id: 0,
      name: f.value.name,
      mrp: f.value.mrp,
      perPieceRate: f.value.perPieceRate,
      quantity: f.value.quantity,
      addedDate: this.formatDateToLocal(new Date()),
      updatedDate: this.formatDateToLocal(new Date()),
    };
    this.service.addDrug(obj).subscribe((response: any) => {
      if (response.message == 'Drugs Added Successfully') {
        this.dialogRef.close(true);
        this.snackBar.open(response.message+'.', 'Close', { duration: 3000 });
      } else {
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
      }
    });
  }

  formatDateToLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
