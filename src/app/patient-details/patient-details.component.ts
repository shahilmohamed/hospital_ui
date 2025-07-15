import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { HttpService } from '../http.service';
import { Patient } from '../model/Patient';
import { CookieService } from 'ngx-cookie-service';
import { Doctor } from '../model/Doctor';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patients: Patient[] = [];
  doctor: Doctor | undefined;
  value = '';
  tempPatients: any[]= [];
  p:number =1;

  constructor(private service: HttpService, private cookieService: CookieService) { }

  ngOnInit(): void {
    document.body.className = "bg_background_addNewPatient";
    let obj: Doctor = {
      id: Number(this.cookieService.get("id")),
      firstname: '',
      lastname: '',
      gender: '',
      email: '',
      phoneNumber: '',
      address: '',
      bloodGroup: '',
      dob: undefined,
      password: '',
      role: '',
      specialization: ''
    }
    this.getAllPatients(obj);
  }


  onClickSearch(value: string): void {
    const query = value.trim().toLowerCase();

    this.tempPatients = this.patients.filter(patient => {
      return (
        patient.firstname.toLowerCase().includes(query) ||
        patient.contactNumber.includes(query) ||
        patient.id.toString() === query
      );
    });
    if (!query) {
      this.tempPatients = [...this.patients];
      return;
    }

  }

  getAllPatients(obj: Doctor)
  {
    this.service.getAllPatients(obj)
    .subscribe((response)=>
    {
      this.patients = response.data;
      this.tempPatients = [...this.patients];
    })
  }

  calculateAge(dob: any) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
