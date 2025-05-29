import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-select-dialog',
  templateUrl: './patient-select-dialog.component.html',
  styleUrls: ['./patient-select-dialog.component.css']
})
export class PatientSelectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PatientSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public patients: any[]) { }

  ngOnInit(): void {
  }

  select(patient: any) {
    this.dialogRef.close(patient);
  }

  cancel() {
    this.dialogRef.close();
  }

}
