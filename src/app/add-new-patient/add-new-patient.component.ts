import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Patient } from '../model/Patient';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.css']
})
export class AddNewPatientComponent implements OnInit {

  constructor(private router: Router, private service: HttpService, private cookieService: CookieService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    document.body.className = "bg_background_addNewPatient";
  }

  mobile_number_pattern = /^[6-9]\d{9}$/;
  uploadFile: File[] = [];
  today: Date = new Date();

  onSubmit(f:NgForm)
  {
    let obj: Patient = {
      id: 0,
      firstname: f.value.firstname,
      lastname: f.value.lastname,
      gender: f.value.gender,
      dob: this.formatDateToLocal(new Date(f.value.dob)),
      contactNumber: f.value.contactNumber,
      address: f.value.address,
      bloodGroup: f.value.bloodGroup
    };
    if (this.cookieService.get("id"))
    {
      this.service.addNewPatient(obj).subscribe((response: any) => {
        if(response.message=="Patient Added Successfully")
        {
          this.router.navigate(['/dashboard/patients']);
          this.snackBar.open(response.message+'.', 'Close', { duration: 3000 });
        }
        else
        {
          this.router.navigate(['/dashboard/addNewpatient']);
          this.snackBar.open(response.message+'.', 'Close', { duration: 3000 });
        }
      });
    }
    else
    {
      this.snackBar.open("Not A Valid User!!!", 'Close', { duration: 3000 });
    }
    

  }

  onFileChange(event: any) {
    this.uploadFile = Array.from(event.target.files);
    if (this.uploadFile.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('File content:', this.uploadFile);
      };
      reader.readAsDataURL(this.uploadFile[0]);
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
