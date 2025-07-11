import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.css']
})
export class AddNewPatientComponent implements OnInit {

  constructor(private router: Router, private service: HttpService, private cookieService: CookieService) { }

  ngOnInit(): void {
    document.body.className = "bg_background_addNewPatient";
  }

  mobile_number_pattern = /^[6-9]\d{9}$/;
  message: string ="";

  onSubmit(f:NgForm)
  {
    let obj = {
      firstname: f.value.firstname,
      lastname: f.value.lastname,
      gender: f.value.gender,
      dob: this.formatDateToLocal(new Date(f.value.dob)),
      contactNumber: f.value.contactNumber,
      address: f.value.address,
      bloodGroup: f.value.bloodGroup
    };
    const id = this.cookieService.get("id");
    if(id)
    {
      this.service.addNewPatient(obj,id).subscribe((response: any) => {
        if(response.message=="Patient added successfully")
        {
          this.router.navigate(['/dashboard/patients'])
        }
        else
        {
          this.message = response.message;
        }
      });
    }
    else
    {
      this.message = "Not a valid user";
    }
    

  }

  formatDateToLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  ngOnDestroy(): void {
    document.body.className = '';
  }

}
