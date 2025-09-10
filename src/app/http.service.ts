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

  // private url : string = "http://localhost:8081";
  private url : string = environment.url;

  signup(obj:any)
  {
    return (this.http.post(`${this.url}/auth/signup`,obj));
  }

  login(obj:any)
  {
    return (this.http.post(`${this.url}/auth/login`,obj,{withCredentials: true}));
  }

  logout()
  {
    return (this.http.get(`${this.url}/auth/logout`, {withCredentials: true}));
  }

  addNewPatient(obj: Patient)
  {
    return (this.http.post(`${this.url}/patients/add`, obj, {withCredentials: true}));
  }

  getAllPatients(): Observable<PatientResponse>
  {
    return (this.http.get<PatientResponse>(`${this.url}/patients/getAllPatient`, {withCredentials: true}));
  }

  addAppointmentSearchPatient(obj: Patient): Observable<SearchPatientResponse>
  {
    return (this.http.post<SearchPatientResponse>(`${this.url}/patients/searchPatient`, obj, {withCredentials: true}));
  }

  addAppointment(obj: Appointment)
  {
    return (this.http.post(`${this.url}/appointment/add`,obj, {withCredentials: true}));
  }

  getAppointment(obj: Appointment): Observable<AppointmentResponse>
  {
    return (this.http.post<AppointmentResponse>(`${this.url}/appointment/get`, obj, {withCredentials: true}));
  }
}
