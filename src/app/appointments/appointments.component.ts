import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Appointment } from '../model/Appointment';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  constructor(private service: HttpService) { }

  ngOnInit(): void {
    document.body.className = "bg_background_addNewPatient";
    this.getAllAppointments();
  }
  patients = [
    { id: 1, name: 'John Doe', contact: '1234567890', diagnosis: 'fever' },
    { id: 2, name: 'Jane Smith', contact: '9876543210', diagnosis: 'cold' },
    { id: 3, name: 'Michael Johnson', contact: '5556667777', diagnosis: 'flu' } 
  ];
  appointment: Appointment[] = [];
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

  getAllAppointments()
  {
    const date =this.getTodayDate();
    let obj: Appointment = {
      
    firstname: "",
    lastname: "",
    contactNumber: "",
    diagnosis: "",
    diagnosisDate: date,
    isConsulted: true,
    id:0
    }
    this.service.getAppointment(obj).
    subscribe((response)=>
    {
      console.log(response);
    });
  }

  getTodayDate(): any
  {
    const date = new Date();
    const day=date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
