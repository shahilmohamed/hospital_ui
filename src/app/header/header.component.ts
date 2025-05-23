import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  userName: string = `Dr. ${sessionStorage.getItem("firstname")} ${sessionStorage.getItem("lastname")}`;
  ngOnInit(): void {
  }

  logout() {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phoneNumber");
    sessionStorage.removeItem("firstname");
    sessionStorage.removeItem("lastname");
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
