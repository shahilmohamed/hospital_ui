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
    console.log(obj);
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
