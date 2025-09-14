import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { HttpService } from '../http.service';
import { Patient } from './../model/Patient';
import { MedicalHistoryResponse } from '../model/MedicalHistoryResponse';
import { History } from '../model/History';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {

  patientId: number = 0;
  name: string = "";
  selectedPrescription: any=null;

  history: History[] = [];

  constructor(private route: ActivatedRoute, private service: HttpService) { }

  ngOnInit() {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    document.body.className = 'bg_background_addNewPatient';
    const patient: Patient = {
      id: this.patientId,
      firstname: '',
      lastname: '',
      gender: '',
      contactNumber: '',
      address: '',
      bloodGroup: '',
      dob: undefined
    };
    this.getMedicalHistory(patient);
    this.getPatientDetails(this.patientId);
  }
  getMedicalHistory(patient: Patient) {
    this.service.getMedicalHistory(patient)
      .subscribe((response: MedicalHistoryResponse) => {
        this.history = response.data;
      });
  }

  getPatientDetails(id: number) {
    this.service.getPatientById(id)
      .subscribe((response: any) => {
        this.name = response.data.firstname + ' ' + response.data.lastname;
      });
  }

  //  openPrescription(prescription: any): void {
  //   // this.selectedPrescription = prescription;
  //   // const modal = document.getElementById('prescriptionModal');
  //   // if (modal) new bootstrap.Modal(modal).show();
  // }

  value = '';
  filteredHistory = [...this.history];
  p: number = 1;
  p1: number = 1;

  // onClickSearch(value: string): void {
  //   const query = value.trim().toLowerCase();

  //   this.filteredHistory = this.history.filter(patient => {
  //     // return (
  //     //   patient.diagnosis.toLowerCase().includes(query) 
  //     // );
  //   });
  //   if (!query) {
  //     this.filteredHistory = [...this.history];
  //     return;
  //   }

  // }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
