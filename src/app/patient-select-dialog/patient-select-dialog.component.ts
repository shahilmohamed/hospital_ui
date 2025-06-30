import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../model/Patient';

@Component({
  selector: 'app-patient-select-dialog',
  templateUrl: './patient-select-dialog.component.html',
  styleUrls: ['./patient-select-dialog.component.css']
})
export class PatientSelectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PatientSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public patients: Patient[]) { }

  ngOnInit(): void {
  }

  select(patient: Patient) {
    this.dialogRef.close(patient);
  }

  cancel() {
    this.dialogRef.close();
  }

  calculateAge(dob: any) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }



}
