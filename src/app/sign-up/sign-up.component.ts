import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    standalone: false
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router, private service: HttpService, private fb: FormBuilder) { }
  
  signupForm!: FormGroup;
  selectedDate: Date | null = null;
  email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$/;
  mobile_number_pattern = /^[6-9]\d{9}$/;
  incorrect: string="";
  today: Date = new Date();


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      role: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.email_pattern)]],
      password: ['', [Validators.required, Validators.pattern(this.password_pattern)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.mobile_number_pattern)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      let obj = {
        firstname: this.signupForm.value.firstname,
        lastname: this.signupForm.value.lastname,
        dob: this.formatDateToLocal(new Date(this.signupForm.value.dob)),
        gender: this.signupForm.value.gender,
        role: this.signupForm.value.role,
        specialization: this.signupForm.value.specialization,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        phoneNumber: this.signupForm.value.phoneNumber,
      };
      this.service.signup(obj).subscribe((response: any) => {
        this.incorrect = response.message;
        if (this.incorrect == 'User registered successfully') {
          this.signupForm.reset();
        }
      });
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

  formatDateToLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  get f() {
    return this.signupForm.controls;
  }

}
