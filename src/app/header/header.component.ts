import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';

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
    private snackBar: MatSnackBar
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

  logout() {
    this.service.logout().subscribe((response: any) => {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.snackBar.open(response.message, 'Close', { duration: 3000 });
    });
  }
}
