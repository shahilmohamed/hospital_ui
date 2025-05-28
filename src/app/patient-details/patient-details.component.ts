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
    document.body.className = "bg_background_addNewPatient";
  }

  patients = [
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 3, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 4, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 5, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 6, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 7, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 8, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 9, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 10, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 11, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 12, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 13, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 14, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 15, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 3, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 4, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 5, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 6, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 7, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 8, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 9, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 10, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 11, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 12, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 13, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 14, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 15, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 3, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 4, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 5, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 6, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 7, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 8, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 9, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 10, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 11, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 12, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 13, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 14, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 15, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 3, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 4, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 5, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 6, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 7, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 8, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 9, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 10, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 11, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 12, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 13, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 14, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 15, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 3, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 4, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 5, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 6, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 7, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 8, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 9, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 10, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 11, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 12, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' },
    { id: 13, name: 'John Doe', age: 45, gender: 'Male', contact: '1234567890', blood: 'b+', address: 'bangalore', doctor: 'shahil' },
    { id: 14, name: 'Jane Smith', age: 32, gender: 'Female', contact: '9876543210', blood: 'a+', address: 'preiyakulam', doctor: 'subha' },
    { id: 15, name: 'Michael Johnson', age: 60, gender: 'Male', contact: '5556667777', blood: 'o+', address: 'madurai', doctor: 'subha' }
  ];
  value = '';
  filteredPatients = [...this.patients];
  p:number =1;

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

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
