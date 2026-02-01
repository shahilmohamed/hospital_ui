import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddAppointmentPopupComponent } from '../add-appointment-popup/add-appointment-popup.component';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { PatientSelectDialogComponent } from '../patient-select-dialog/patient-select-dialog.component';
import { NgForm } from '@angular/forms';
import { SearchPatient } from '../model/SearchPatient';
import { SearchPatientResponse } from '../model/SearchPatientResponse';

@Component({
    selector: 'app-add-appointments',
    templateUrl: './add-appointments.component.html',
    styleUrls: ['./add-appointments.component.css'],
    standalone: false
})
export class AddAppointmentsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddAppointmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private service: HttpService
  ) {}

  ngOnInit(): void {
  }

  msg: string = '';
  patient_name: string = '';
  matchedPatients: SearchPatient[] =[];
  onSubmit(form: NgForm) {
    const { contactNumber, patientId } = form.value;
    let obj: any = {
      contactNumber: form.value.contactNumber,
      id: form.value.patientId,
    };
    // API call to fetch patient data
    this.service.addAppointmentSearchPatient(obj).subscribe(
      (response: SearchPatientResponse) => {
        this.matchedPatients = response.data;

        if (!this.matchedPatients || this.matchedPatients.length === 0) {
          this.snackBar.open('No patient found.', 'Close', { duration: 3000 });
        } else if (this.matchedPatients.length === 1) {
          this.patient_name = this.matchedPatients[0].firstname + " " + this.matchedPatients[0].lastname;
          sessionStorage.setItem("patient_name",this.patient_name);
          sessionStorage.setItem("patient_id", "" + this.matchedPatients[0].id);
          this.openAppointmentDialog(this.matchedPatients[0]);
        } else {
          const dialogRef = this.dialog.open(PatientSelectDialogComponent, {
            width: '500px',
            data: this.matchedPatients,
          });

          dialogRef.afterClosed().subscribe((selectedPatient: SearchPatient) => {
              if (selectedPatient) {
              this.patient_name = this.matchedPatients[0].firstname + " " + selectedPatient.lastname;
              sessionStorage.setItem("patient_name",this.patient_name);
              sessionStorage.setItem("patient_id", "" + selectedPatient.id);
                this.openAppointmentDialog(selectedPatient);
              }
            });
        }
      },
      (error) => {
        this.snackBar.open('Error fetching patient data.', 'Close', {
          duration: 3000,
        });
        console.error(error);
      }
    );
  }

  openAppointmentDialog(patient: SearchPatient) {
    this.dialogRef.close();
    this.dialog.open(AddAppointmentPopupComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: patient,
      panelClass: 'modern-dialog'
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
