import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  userName: string = `Dr. ${sessionStorage.getItem("name")}`;
  ngOnInit(): void {
  }

  logout() {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("name");
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
