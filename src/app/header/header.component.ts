import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { AddAppointmentsComponent } from '../add-appointments/add-appointments.component';
import { AddNewPatientComponent } from '../add-new-patient/add-new-patient.component';
import { AddDrugsComponent } from '../add-drugs/add-drugs.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';

  constructor(
    private router: Router,
    private service: HttpService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  userName: string = `Dr. ${localStorage.getItem('name') || ''}`;
  
  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

  isHomeActive(): boolean {
    const route = this.currentRoute.split('?')[0];
    return route === '/dashboard' || route === '/dashboard/';
  }

  isAppointmentsActive(): boolean {
    const route = this.currentRoute.split('?')[0];
    return route.includes('/addAppointment') || 
           route.includes('/viewAppointments');
  }

  isPatientsActive(): boolean {
    const route = this.currentRoute.split('?')[0];
    return route.includes('/addNewpatient') || 
           route.includes('/patients');
  }

  isDrugsActive(): boolean {
    const route = this.currentRoute.split('?')[0];
    return route.includes('/addDrugs') || 
           route.includes('/viewDrugs');
  }

  openAddAppointmentDialog(): void {
    const dialogRef = this.dialog.open(AddAppointmentsComponent, {
      width: '600px',
      maxWidth: '90vw',
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

  openAddDrugsDialog(): void {
    const dialogRef = this.dialog.open(AddDrugsComponent, {
      width: '600px',
      maxWidth: '90vw',
      panelClass: 'modern-dialog'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate(['/dashboard/viewDrugs']);
      }
    });
  }

  logout() {
    this.service.logout().subscribe((response: any) => {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.snackBar.open(response.message, 'Close', { duration: 3000 });
    });
  }
}
