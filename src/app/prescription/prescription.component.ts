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

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
})
export class PrescriptionComponent implements OnInit {
  constructor(
    private service: HttpService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<Appointment>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment
  ) {}

  ngOnInit(): void {
    document.body.className = 'bg_background_addPrescription';
    // this.getDrugs();
    this.loadDrugs();
  }

  appointmentDetails: Appointment = {
    id: this.data.id,
    firstname: this.data.firstname,
    lastname: this.data.lastname,
    contactNumber: this.data.contactNumber,
    diagnosis: this.data.diagnosis,
    diagnosisDate: this.data.diagnosisDate,
    isConsulted: true
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

  onSubmit(f: any) {
    console.log(f.value);
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
        // this.page++;
        // this.loading = false;
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
    this.searchQuery = query;
    this.page = 0;
    this.drugs = [];
    this.loadDrugs();
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedDrug = this.drugs.find(
      (drug) => drug.name === event.option.value
    );
    console.log(event);
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

  ngOnDestroy(): void {
    document.body.className = ""
  }

}
