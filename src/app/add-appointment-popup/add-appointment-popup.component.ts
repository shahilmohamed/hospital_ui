import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from '../model/Patient';
import { Appointment } from '../model/Appointment';

@Component({
  selector: 'app-add-appointment-popup',
  templateUrl: './add-appointment-popup.component.html',
  styleUrls: ['./add-appointment-popup.component.css'],
})
export class AddAppointmentPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddAppointmentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private service: HttpService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  patient_name: string | null = sessionStorage.getItem("patient_name");
  onSubmit(f: any) {
    let obj: Appointment = {
      firstname: this.data.firstname,
      lastname: this.data.lastname,
      contactNumber: this.data.contactNumber,
      diagnosis: f.value.diagnosis,
      diagnosisDate: this.formatDateToLocal(new Date(f.value.diagnosisDate)),
      isConsulted: false,
      id: Number(sessionStorage.getItem("patient_id"))
    };
    this.service.addAppointment(obj).subscribe((response: any) => {
      this.dialogRef.close();
      this.snackBar.open(response.message+'.', 'Close', { duration: 3000 });
      sessionStorage.removeItem("patient_name");
      sessionStorage.removeItem("patient_id");
    });
  }

  formatDateToLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
