import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddAppointmentPopupComponent } from '../add-appointment-popup/add-appointment-popup.component';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { PatientSelectDialogComponent } from '../patient-select-dialog/patient-select-dialog.component';

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

     // Simulated fetch — replace with real backend call
    const matchedPatients = this.fetchPatients(contactNumber, patientId);

    if (matchedPatients.length === 0) {
      this.snackBar.open('No patient found.', 'Close', { duration: 3000 });
    } else if (matchedPatients.length === 1) {
      this.openAppointmentDialog(matchedPatients[0]);
    } else {
      // Multiple matches — show selection dialog
      const dialogRef = this.dialog.open(PatientSelectDialogComponent, {
        width: '500px',
        data: matchedPatients
      });

      dialogRef.afterClosed().subscribe((selectedPatient) => {
        if (selectedPatient) {
          this.openAppointmentDialog(selectedPatient);
        }
      });
    }

  }

  openAppointmentDialog(patient: any) {
    this.dialog.open(AddAppointmentPopupComponent, {
      width: '500px',
      data: patient
    });
  }

  fetchPatients(mobile: string, id: string): any[] {
    // Simulated data — replace with actual backend call
    const allPatients = [
      { id: 1, name: 'John Doe', age: 34, mobile: '9999999999' },
      { id: 2, name: 'Jane Doe', age: 28, mobile: '9999999999' },
      { id: 3, name: 'Ali Khan', age: 40, mobile: '8888888888' }
    ];

    return allPatients.filter(p =>
      (mobile && p.mobile === mobile) || (id && p.id.toString() === id)
    );
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
