import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {

  constructor() { }
  private appointment: any;

  setAppointment(data: any) {
    this.appointment = data;
  }

  getAppointment() {
    return this.appointment;
  }
}
