import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private service: HttpService, private cookieService: CookieService) { }

  ngOnInit(): void {
    document.body.className = "bg_background";
  }

  email_pattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
  password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$/;
  msg: any = "";
  hide = true;
  name: string ="";
  onSubmit(f: any) {
    let obj = {
      username: f.value.email,
      password: f.value.password
    };
    this.service.login(obj).subscribe((response: any) => {
      if (response.message == 'Login successful') {
        this.router.navigate(['/dashboard']);
        // this.name = response.data.firstname+" "+response.data.lastname;
      } else {
        this.msg = response.message;
      }
    });
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
