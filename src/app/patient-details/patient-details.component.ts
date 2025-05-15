import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../shared/material.module';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  patients = [
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 3, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' }
  ];
  value = '';
  filteredPatients = [...this.patients];

  onClickSearch(value: string): void {
    const query = value.trim().toLowerCase();

    this.filteredPatients = this.patients.filter(patient => {
      return (
        patient.name.toLowerCase().includes(query) ||
        patient.contact.includes(query) ||
        patient.id.toString() === query
      );
    });
    if (!query) {
      this.filteredPatients = [...this.patients];
      return;
    }

  }

}
