import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.className = "bg_background_addNewPatient";
  }
  patients = [
    { id: 1, name: 'John Doe', contact: '1234567890', diagnosis: 'fever' },
    { id: 2, name: 'Jane Smith', contact: '9876543210', diagnosis: 'cold' },
    { id: 3, name: 'Michael Johnson', contact: '5556667777', diagnosis: 'flu' }
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
