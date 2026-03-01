import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../http.service';
import { Appointment } from '../model/Appointment';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PrescriptionComponent } from '../prescription/prescription.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.css'],
    standalone: false
})
export class AppointmentsComponent implements OnInit, OnDestroy {

  private queryParamsSubscription?: Subscription;

  constructor(private service: HttpService,
    private toastr: ToastrService,
    private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    document.body.className = "bg_background_addNewPatient";
    // this.getAllAppointments();
    this.today = this.getTodayDate();
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.flag = params['consulted'] === 'true';
      this.page = 1;
      this.value = '';
      this.getTodayAppointments(0, 10, '', this.today, this.flag);
    });
  }
  flag: boolean = false;
  appointments: Appointment[] = [];
  value = '';
  tempPatients: any[] = [];
  page: number = 1;
  msg: any = "";
  selectedAppointment: Appointment = <Appointment>{};
  totalPage: number = 0;
  today: string = '';

  // onClickSearch(value: string): void {
  //   const query = value.trim().toLowerCase();

  //   this.tempPatients = this.appointments.filter(patient => {
  //     return (
  //       patient.firstname.toLowerCase().includes(query) ||
  //       patient.contactNumber.includes(query) ||
  //       patient.id.toString() === query
  //     );
  //   });
  //   if (!query) {
  //     this.tempPatients = [...this.appointments];
  //     return;
  //   }
  // }

  // getAllAppointments()
  // {
  //   const date =this.getTodayDate();
  //   let obj: Appointment = {
      
  //   firstname: "",
  //   lastname: "",
  //   contactNumber: "",
  //   diagnosis: "",
  //   diagnosisDate: date,
  //   isConsulted: true,
  //   id:0,
  //   doctor_id:0,
  //   patient_id:0
  //   }
  //   this.service.getAppointment(obj).
  //   subscribe((response)=>
  //   {
  //     if(response.status==204)
  //     {
  //       this.toastr.info(response.message, "Info");
  //     }
  //     else if(response.status==403)
  //     {
  //       this.toastr.error(response.message, 'Error');
  //     }
  //     else if(response.message=='Appointments found')
  //     {
  //       this.appointments = response.data;
  //       this.tempPatients = [...this.appointments];
  //     }
  //     else{
  //       this.msg = response.message;
  //     }
  //   });
  // }

  getTodayDate(): any
  {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
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
    const dialogRef = this.dialog.open(PrescriptionComponent, {
      width: '1500px',
      data: appointment
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.appointments = [];
        this.tempPatients = [];
        this.totalPage = 0;
        this.page = 1;
        this.value = '';
        this.today = this.getTodayDate();
        this.getTodayAppointments(0, 10, '', this.today, this.flag);
      }
    });
  }

  async getTodayAppointments(page: number, size: number, search: string, today: string, flag: boolean) {
    const obj: any = {
      page: page,
      size: size,
      search: search,
      date: today
    }
    if (flag) {
      const response = await this.service.getConsultedAppointmentsPage(obj).subscribe((response: any) => {
        if (response.status == 200) {
          this.appointments = response.data;
          this.tempPatients = [...this.appointments];
          this.totalPage = response.totalPage;
        }
        else if (response.status == 204) {
          this.appointments = response.data;
          this.tempPatients = [...this.appointments];
          this.totalPage = response.totalPage;
          this.toastr.info(response.message, 'Info');
        }
        else if (response.status == 403) {
          this.toastr.error(response.message, 'Error');
        }
      });
    }
    else {
      const response = await this.service.getAppointmentPage(obj).subscribe((response: any) => {
        if (response.status == 200) {
          this.appointments = response.data;
          this.tempPatients = [...this.appointments];
          this.totalPage = response.totalPage;
        }
        else if (response.status == 204) {
          this.appointments = response.data;
          this.tempPatients = [...this.appointments];
          this.toastr.info(response.message, 'Info');
        }
        else if (response.status == 403) {
          this.toastr.error(response.message, 'Error');
        }
      });
    }
  }

  getPage(pageNumber: number): void {
    this.page = pageNumber;
    this.getTodayAppointments(pageNumber - 1, 10, this.value, this.today, this.flag);
  }

  getSearchAppointments(value: string): void {
    this.value = value;
    this.getTodayAppointments(0, 10, value, this.today, this.flag);
  }

  ngOnDestroy(): void {
    document.body.className = '';
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

}
