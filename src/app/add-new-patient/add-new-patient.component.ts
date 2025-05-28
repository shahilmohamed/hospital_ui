import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.css']
})
export class AddNewPatientComponent implements OnInit {

  constructor(private router: Router, private service: HttpService) { }

  ngOnInit(): void {
  }

  mobile_number_pattern = /^[6-9]\d{9}$/;

  onSubmit(f:any)
  {
    console.log(f);
  }

}
