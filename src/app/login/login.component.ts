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

  constructor(private router: Router) { }

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
    // this.service.login(obj)
    // .subscribe((response: any)=>
    // {
    //   if(response.msg=='Login successfully')
    //   {
    //     this.router.navigate(['/home']);
    //     sessionStorage.setItem("email",response.object.email);
    //     sessionStorage.setItem("phoneNumber",response.object.phoneNumber);
    //     sessionStorage.setItem("firstname",response.object.firstname);
    //     sessionStorage.setItem("lastname",response.object.lastname);
    //   }
    //   else{
    //     this.msg=response.msg;
    //   }
    // })
    // private service: HttpService
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
