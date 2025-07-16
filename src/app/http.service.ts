import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PatientResponse } from './model/PatientResponse';
import { Patient } from './model/Patient';
import { Appointment } from './model/Appointment';
import { AppointmentResponse } from './model/AppointmentResponse';
import { SearchPatientResponse } from './model/SearchPatientResponse';
import { Doctor } from './model/Doctor';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private url : string = "http://localhost:8080";

  signup(obj:any)
  {
    return (this.http.post(`${this.url}/signup`,obj));
  }

  login(obj:any)
  {
    return (this.http.post(`${this.url}/login`,obj,{withCredentials: true}));
  }

  logout()
  {
    return (this.http.get(`${this.url}/logout`, {withCredentials: true}));
  }

  addNewPatient(obj: Patient)
  {
    return (this.http.post(`${this.url}/addPatient`, obj, {withCredentials: true}));
  }

  getAllPatients(): Observable<PatientResponse>
  {
    return (this.http.get<PatientResponse>(`${this.url}/getAllPatient`, {withCredentials: true}));
  }

  addAppointmentSearchPatient(obj: Patient): Observable<SearchPatientResponse>
  {
    return (this.http.post<SearchPatientResponse>(`${this.url}/searchPatient`, obj, {withCredentials: true}));
  }

  addAppointment(obj: Appointment)
  {
    return (this.http.post(`${this.url}/addAppointment`,obj));
  }

  getAppointment(obj: Appointment): Observable<AppointmentResponse>
  {
    return (this.http.post<AppointmentResponse>(`${this.url}/getAppointment`, obj));
  }
}
