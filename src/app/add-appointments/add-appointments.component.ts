import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddAppointmentPopupComponent } from '../add-appointment-popup/add-appointment-popup.component';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.css']
})
export class AddAppointmentsComponent implements OnInit {

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router, private service: HttpService) { }

  ngOnInit(): void {
    document.body.className = "bg_background_addAppointment";
  }

  patient = { id: '1', name: 'John Doe', contactNumber: '1234567890', diagnosis: 'fever' };
  msg: string = "";
  onSubmit(f: any){
    const { contactNumber, patientId } = f.value;

    // Example check (replace with actual service call)
    const patientExists = this.checkPatientExists(contactNumber, patientId);

    if (patientExists) {
      this.dialog.open(AddAppointmentPopupComponent, {
        width: '500px',
        data: { contactNumber, patientId }
      });
    } else {
      this.snackBar.open('No patient found.', 'Close', {
        duration: 3000
      });
    }

  }

  checkPatientExists(mobile: string, id: string): boolean {
    // Replace with actual backend API logic
    return mobile === this.patient.contactNumber || id === this.patient.id;
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
