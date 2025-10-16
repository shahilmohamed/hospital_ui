import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Appointment } from '../model/Appointment';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PrescriptionComponent } from '../prescription/prescription.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  constructor(private service: HttpService, 
    private toastr: ToastrService,
     private dialog: MatDialog) { }

  ngOnInit(): void {
    document.body.className = "bg_background_addNewPatient";
    this.getAllAppointments();
  }
  appointments: Appointment[] = [];
  value = '';
  tempPatients: any[]= [];
  p:number =1;
  msg: any = "";
  selectedAppointment: Appointment = <Appointment>{};

  onClickSearch(value: string): void {
    const query = value.trim().toLowerCase();

    this.tempPatients = this.appointments.filter(patient => {
      return (
        patient.firstname.toLowerCase().includes(query) ||
        patient.contactNumber.includes(query) ||
        patient.id.toString() === query
      );
    });
    if (!query) {
      this.tempPatients = [...this.appointments];
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
      if(response.status==204)
      {
        this.toastr.info(response.message, "Info");
      }
      else if(response.status==403)
      {
        this.toastr.error(response.message, 'Error');
      }
      else if(response.message=='Appointments found')
      {
        this.appointments = response.data;
        this.tempPatients = [...this.appointments];
      }
      else{
        this.msg = response.message;
      }
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

  addPrescription(appointment: Appointment)
  {
    this.openPrescriptionDialog(appointment);
  }

  openPrescriptionDialog(appointment: Appointment)
  {
    this.dialog.open(PrescriptionComponent, {
      width: '800px',
      data: appointment
    })
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
