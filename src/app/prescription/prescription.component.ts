import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from './../model/Appointment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Drug } from './../model/Drug';
import { DrugsResponse } from './../model/DrugsResponse';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Prescription } from '../model/Prescription';
import { Patient } from '../model/Patient';
import { Doctor } from '../model/Doctor';
import { MedicalHistory } from '../model/MedicalHistory';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-prescription',
    templateUrl: './prescription.component.html',
    styleUrls: ['./prescription.component.css'],
    standalone: false
})
export class PrescriptionComponent implements OnInit {
  constructor(
    private service: HttpService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<Appointment>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    document.body.className = 'bg_background_addPrescription';
    this.loadDrugs();

    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((searchTerm) => {
        if (searchTerm.length >= 2) {
          this.searchQuery = searchTerm;
          this.page = 0;
          this.drugs = [];
          this.loadDrugs();
        } else {
          this.drugs = [];
        }
      });
  }

  appointmentDetails: Appointment = {
    id: this.data.id,
    firstname: this.data.firstname,
    lastname: this.data.lastname,
    contactNumber: this.data.contactNumber,
    diagnosis: this.data.diagnosis,
    diagnosisDate: this.data.diagnosisDate,
    isConsulted: true,
    doctor_id: this.data.doctor_id,
    patient_id: this.data.patient_id,
  };

  patientName: string =
    this.appointmentDetails.firstname + ' ' + this.appointmentDetails.lastname;
  drugs: Drug[] = [];
  selectedDrug: Drug | null = null;
  page: number = 0;
  pageSize: number = 10;
  searchQuery: string = '';
  loading = false;
  selectedDrugId: number | null = null;
  selectedDrugName: string = '';
  dosage = { morning: 0, afternoon: 0, evening: 0 };
  days: number = 1;
  prescriptionList: Prescription[] = [];
  patient: Patient | null = null;
  doctor: Doctor | null = null;
  today: Date = new Date();
  searchSubject = new Subject<string>();
  showDownloadDialog: boolean = false;
  selectedHistoryId: number | null = null;

  async onSubmit(f: any) {
    try {
      const patientResponse: any = await this.service
        .getPatientById(this.appointmentDetails.patient_id)
        .toPromise();
      this.patient = patientResponse.data;

      const doctorResponse: any = await this.service
        .getDoctorById(this.appointmentDetails.doctor_id)
        .toPromise();
      this.doctor = doctorResponse.data[0];

      if (!this.doctor || !this.patient) {
        console.error('Doctor or patient not found');
        return;
      }

      const medicalHistory: MedicalHistory = {
        diagnosisDate: this.appointmentDetails.diagnosisDate,
        diagnosis: this.appointmentDetails.diagnosis,
        revisitDate: this.formatDateToLocal(new Date(f.value.revisitDate)),
        review: f.value.review,
        doctor: this.doctor,
        patient: this.patient,
        prescriptions: this.prescriptionList,
        appointment_id: this.appointmentDetails.id,
      };

      const historyResponse: any = await this.service
        .addHistory(medicalHistory)
        .toPromise();
      if(historyResponse.status == 200){
        this.toastr.success(historyResponse.message, 'Success');
        if(historyResponse.data && historyResponse.data.id) {
          this.selectedHistoryId = historyResponse.data.id;
          this.showDownloadDialog = true;
          return;
        }
        this.dialogRef.close(true);
      }
      else if(historyResponse.status == 204){
        this.toastr.info(historyResponse.message, 'Info');
        this.dialogRef.close(false);
      }
      else if(historyResponse.status == 403){
        this.toastr.error(historyResponse.message, 'Error');
        this.dialogRef.close(false);
      }
    } catch (error) {
      console.error('Error while submitting form', error);
    }
  }

  getDrugs() {
    this.service.getAllDrugs().subscribe((response: DrugsResponse) => {
      this.drugs = response.data;
    });
  }

  loadDrugs(): void {
    if (this.loading) return;
    this.loading = true;
    const payload = {
      page: this.page,
      size: this.pageSize,
      search: this.searchQuery,
    };
    this.service.getSearchDrug(payload).subscribe(
      (response: DrugsResponse) => {
        this.drugs = [...this.drugs, ...response.data];
        if (this.page === 0) {
          this.drugs = response.data;
        } else {
          this.drugs = [...this.drugs, ...response.data];
        }
        this.page++;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      }
    );
  }

  onScroll(): void {
    this.loadDrugs();
  }

  onSearchChange(query: string) {
    this.searchSubject.next(query);
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedDrug = this.drugs.find(
      (drug) => drug.name === event.option.value
    );
    if (selectedDrug) {
      this.selectedDrugId = selectedDrug.id;
      this.selectedDrugName = selectedDrug.name;
    }
  }

  onOpenChange(opened: boolean) {
    if (opened) {
      const panel = document.querySelector('.custom-select-panel');
      if (panel) {
        panel.addEventListener('scroll', () => {
          const threshold = 50;
          if (
            panel.scrollTop + panel.clientHeight >=
            panel.scrollHeight - threshold
          ) {
            this.onScroll();
          }
        });
      }
    }
  }

  addDrug(): void {
    if (!this.selectedDrugName.trim()) {
      return;
    }
    const newDrug: Prescription = {
      id: this.selectedDrugId ? this.selectedDrugId : 0,
      name: this.selectedDrugName,
      dosageMorning: this.dosage.morning > 0 ? true : false,
      dosageAfternoon: this.dosage.afternoon > 0 ? true : false,
      dosageNight: this.dosage.evening > 0 ? true : false,
      durationDays: this.days,
    };
    this.prescriptionList.push(newDrug);
    this.resetFields();
  }

  resetFields() {
    this.selectedDrugName = '';
    this.dosage = { morning: 0, afternoon: 0, evening: 0 };
    this.days = 1;
  }

  removeDrug(index: number) {
    this.prescriptionList.splice(index, 1);
  }

  formatDateToLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  generateAndDownloadPdf(historyId: number): void {
    this.service.generatePrescriptionPdf(historyId).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `prescription_${historyId}_${this.patientName.replace(/\s+/g, '_')}.pdf`;
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

  onConfirmDownload(): void {
    if (this.selectedHistoryId) {
      this.generateAndDownloadPdf(this.selectedHistoryId);
    }
    this.showDownloadDialog = false;
    this.selectedHistoryId = null;
    this.dialogRef.close(true);
  }

  onCancelDownload(): void {
    this.showDownloadDialog = false;
    this.selectedHistoryId = null;
    this.dialogRef.close(true);
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
