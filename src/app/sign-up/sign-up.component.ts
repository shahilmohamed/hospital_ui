import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.className="bg_background_signup"
  }
  selectedDate: Date | null = null;
  email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$/;
  mobile_number_pattern = /^[6-9]\d{9}$/;
  onSubmit(f:any)
  {
    let obj={
      fname:f.value.fname,
      lname:f.value.lname,
      dob:f.value.dob,
      gender:f.value.gender,
      specialization:f.value.specialization,
      email:f.value.email,
      password:f.value.password,
      mobile:f.value.phone
    };
    console.log(obj);
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
