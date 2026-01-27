import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private snackBar: MatSnackBar
  ) {}

  userName: string = `Dr. ${localStorage.getItem('name') || ''}`;
  ngOnInit(): void {}

  logout() {
    this.service.logout().subscribe((response: any) => {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.snackBar.open(response.message, 'Close', { duration: 3000 });
    });
  }
}
