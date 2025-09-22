import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PatientResponse } from './model/PatientResponse';
import { Patient } from './model/Patient';
import { Appointment } from './model/Appointment';
import { AppointmentResponse } from './model/AppointmentResponse';
import { SearchPatientResponse } from './model/SearchPatientResponse';
import { MedicalHistoryResponse } from './model/MedicalHistoryResponse';
import { PatientHistory } from './model/PatientHistory';
import { Drug } from './model/Drug';
import { DrugsResponse } from './model/DrugsResponse';

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
    return (this.http.post(`${this.url}/patients/addPatient`, obj, {withCredentials: true}));
  }

  getAllPatients(): Observable<PatientResponse>
  {
    return (this.http.get<PatientResponse>(`${this.url}/patients/getAllPatient`, {withCredentials: true}));
  }

  getPatientById(id: number): Observable<Patient>
  {
    return (this.http.get<Patient>(`${this.url}/patients/getPatientById/${id}`, {withCredentials: true}));
  }

  addAppointmentSearchPatient(obj: Patient): Observable<SearchPatientResponse>
  {
    return (this.http.post<SearchPatientResponse>(`${this.url}/patients/searchPatient`, obj, {withCredentials: true}));
  }

  addAppointment(obj: Appointment)
  {
    return (this.http.post(`${this.url}/appointment/addAppointment`,obj, {withCredentials: true}));
  }

  getAppointment(obj: Appointment): Observable<AppointmentResponse>
  {
    return (this.http.post<AppointmentResponse>(`${this.url}/appointment/getAppointment`, obj, {withCredentials: true}));
  }

  getAppointmentById(app: Appointment): Observable<Appointment>
  {
    return (this.http.post<Appointment>(`${this.url}/appointment/getAppointmentById`, app, {withCredentials: true}));
  }

  getMedicalHistory(obj: Patient): Observable<MedicalHistoryResponse>
  {
    return (this.http.post<MedicalHistoryResponse>(`${this.url}/history/getHistory`, obj, {withCredentials: true}));
  }

  getPrescriptionById(obj: PatientHistory)
  {
    return (this.http.post<any>(`${this.url}/prescription/getPrescription`, obj, {withCredentials: true}));
  }

  addDrugs(obj: Drug)
  {
    return (this.http.post(`${this.url}/drugs/addDrug`, obj, {withCredentials: true}));
  }
  getAllDrugs(): Observable<DrugsResponse>
  {
    return (this.http.get<DrugsResponse>(`${this.url}/drugs/getDrugs`, {withCredentials: true}));
  }
}
