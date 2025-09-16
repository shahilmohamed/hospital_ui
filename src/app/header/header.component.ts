import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private service: HttpService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar
  ) {}

  userName: string = `Dr. ${this.cookieService.get('name')}`;
  ngOnInit(): void {}

  logout() {
    this.service.logout().subscribe((response: any) => {
      localStorage.removeItem('login');
      this.router.navigate(['/login']);
      this.snackBar.open(response.message, 'Close', { duration: 3000 });
    });
  }
}
