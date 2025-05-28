import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private service: HttpService) { }

  ngOnInit(): void {
    document.body.className = "bg_background";
  }

  email_pattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
  password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$/;
  msg: any = "";
  hide = true;
  onSubmit(f: any) {
    let obj = {
      email: f.value.email,
      password: f.value.password
    };
    this.service.login(obj).subscribe((response: any) => {
      if (response.message == 'Login successfully') {
        this.router.navigate(['/dashboard']);
        console.log(response);
        sessionStorage.setItem('email', response.data.email);
        sessionStorage.setItem('phoneNumber', response.data.phoneNumber);
        sessionStorage.setItem('firstname', response.data.firstname);
        sessionStorage.setItem('lastname', response.data.lastname);
        sessionStorage.setItem('id', response.data.id);
      } else {
        this.msg = response.message;
      }
    });
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
