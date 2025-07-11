import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private service: HttpService,
    private cookieService: CookieService
  ) {}

  userName: string = `Dr. ${this.cookieService.get('name')}`;
  ngOnInit(): void {}

  logout() {
    this.service.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
