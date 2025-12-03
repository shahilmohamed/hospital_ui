import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CookieConsentService } from '../service/cookie-consent.service';
import { CookieHelperService } from '../service/cookie-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router, 
    private service: HttpService, 
    private cookieService: CookieService,
    private cookieConsentService: CookieConsentService,
    private cookieHelperService: CookieHelperService
  ) { }

  ngOnInit(): void {
    document.body.className = "bg_background";
    this.checkCookieConsent();
  }

  email_pattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
  password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$/;
  msg: any = "";
  hide = true;
  name: string = "";
  id: string = "";
  jwtToken: string = "";
  cookieDeclined: boolean = false;

  checkCookieConsent(): void {
    const consentStatus = this.cookieConsentService.getConsentStatus();
    if (consentStatus === 'declined') {
      this.cookieDeclined = true;
      this.msg = "Cookies are required for login. Please accept cookies to continue.";
    }
  }

  async onSubmit(f: any) {
    const consentStatus = this.cookieConsentService.getConsentStatus();
    if (consentStatus === 'declined') {
      this.msg = "Cookies are required for authentication. Please accept cookies to login.";
      return;
    }

    if (consentStatus === 'not_set') {
      this.msg = "Please accept cookies to continue with login.";
      return;
    }

    let obj = {
      username: f.value.email,
      password: f.value.password
    };
    try {
      const loginResponse: any =await this.service.login(obj).toPromise();
    if (loginResponse.message == 'Login successful') {
      this.router.navigate(['/dashboard']);
      this.name = loginResponse.data.name;
      this.id = loginResponse.data.userId;
      this.jwtToken = loginResponse.data.token;
      localStorage.setItem("login", loginResponse.status);
      this.cookieHelperService.setCookie("name", this.name, false);
      this.cookieHelperService.setCookie("id", this.id, false);
      this.cookieHelperService.setCookie("jwtToken", this.jwtToken, false);
      } else {
        this.msg = loginResponse.message;
      }
    } catch (error: any) {
      this.msg = error.error?.message || "Login failed. Please try again.";
    }
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
