import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddAppointmentsComponent } from '../add-appointments/add-appointments.component';
import { MatDialog } from '@angular/material/dialog';
import { AddNewPatientComponent } from '../add-new-patient/add-new-patient.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openAddAppointmentDialog(): void {
    const dialogRef = this.dialog.open(AddAppointmentsComponent, {
      width: '600px',
      maxWidth: '768px',
      panelClass: 'modern-dialog'
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  openAddPatientDialog(): void {
    const dialogRef = this.dialog.open(AddNewPatientComponent, {
      width: '700px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'modern-dialog'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate(['/dashboard/patients']);
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}
