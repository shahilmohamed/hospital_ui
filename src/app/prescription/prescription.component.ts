import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from './../model/Appointment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Drug } from './../model/Drug';
import { DrugsResponse } from './../model/DrugsResponse';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  
  constructor(private service: HttpService, 
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<Appointment>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment) { }

  ngOnInit(): void {
    document.body.className = "bg_background_addPrescription";
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
  }

  patientName: string = this.appointmentDetails.firstname + " " + this.appointmentDetails.lastname;
  drugs: Drug[] = [];
  selectedDrug: Drug | null = null;
  page: number = 0;
  pageSize: number = 10;
  loading = false;

  onSubmit(f:any){

  }

  getDrugs()
  {
    this.service.getAllDrugs()
    .subscribe((response: DrugsResponse)=>
    {
      this.drugs = response.data;
    })
  }

  loadDrugs(): void{
    if(this.loading)return;
    this.loading = true;
    const payload = {
      page: this.page,
      size: this.pageSize
    };
    this.service.getDrugPage(payload)
    .subscribe((response: DrugsResponse)=>
    {
      this.drugs = [...this.drugs, ...response.data];
      this.page++;
      this.loading = false;
    }, 
    (error: any)=>
    {
      this.loading = false;
    })
  }

  onScroll(): void {
    this.loadDrugs();
  }

  onOpenChange(opened: boolean) {
    if (opened) {
      const panel = document.querySelector('.custom-select-panel');
      if (panel) {
        panel.addEventListener('scroll', () => {
          const threshold = 50; // px from bottom
          if (panel.scrollTop + panel.clientHeight >= panel.scrollHeight - threshold) {
            this.onScroll();
          }
        });
      }
    }
  }

  ngOnDestroy(): void {
    document.body.className = ""
  }

}
