import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { HttpService } from '../http.service';
import { Patient } from './../model/Patient';
import { MedicalHistoryResponse } from '../model/MedicalHistoryResponse';
import { PatientHistory } from '../model/PatientHistory';
import { PrescriptionResponse } from '../model/PrescriptionResponse';
import { Prescription } from '../model/Prescription';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-medical-history',
    templateUrl: './medical-history.component.html',
    styleUrls: ['./medical-history.component.css'],
    standalone: false
})
export class MedicalHistoryComponent implements OnInit {

  patientId: number = 0;
  name: string = "";
  selectedPrescription: Prescription[] = [];
  history: PatientHistory[] = [];
  msg: string = '';
  value = '';
  filteredHistory:PatientHistory[] = [];
  p: number = 1;
  p1: number = 1;
  currentHistoryId: number = 0;

  constructor(
    private route: ActivatedRoute, 
    private service: HttpService,
    private toastr: ToastrService
  ) { }

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
      dob: ""
    };
    this.getMedicalHistory(patient);
    this.getPatientDetails(this.patientId);
  }
  getMedicalHistory(patient: Patient) {
    this.service.getMedicalHistory(patient)
      .subscribe((response: MedicalHistoryResponse) => {
        if (response.message === 'Medical History Found') {
          this.history = response.data;
          this.filteredHistory = [...this.history];
        }
        else {
          this.msg = response.message;
        }
      });
  }

  getPatientDetails(id: number) {
    this.service.getPatientById(id)
      .subscribe((response: any) => {
        this.name = response.data.firstname + ' ' + response.data.lastname;
      });
  }

  viewPrescription(historyId: number) {
    this.currentHistoryId = historyId;
    const history: PatientHistory = {
      id: historyId,
      diagnosisDate: '',
      diagnosis: '',
      revisitDate: '',
      review: '',
      doctor_id: 0,
      patient_id: 0
    };
    this.service.getPrescriptionById(history)
      .subscribe((response: PrescriptionResponse) => {
        this.selectedPrescription = response.data || [];
        const modal = document.getElementById('prescriptionModal');
        if (modal) new bootstrap.Modal(modal).show();
      });
  }

  generateAndDownloadPdf(): void {
    if (!this.currentHistoryId) {
      this.toastr.error('No history selected', 'Error');
      return;
    }
    
    this.service.generatePrescriptionPdf(this.currentHistoryId).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `prescription_${this.currentHistoryId}_${this.name.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        this.toastr.success('Prescription PDF downloaded successfully', 'Success');
      },
      (error: any) => {
        console.error('Error generating PDF:', error);
        this.toastr.error('Failed to generate PDF', 'Error');
      }
    );
  }

  onClickSearch(value: string): void {
    const query = value.trim().toLowerCase();

    this.filteredHistory = this.history.filter(patient => {
      return (
        patient.diagnosis.toLowerCase().includes(query) 
      );
    });
    if (!query) {
      this.filteredHistory = [...this.history];
      return;
    }

  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
