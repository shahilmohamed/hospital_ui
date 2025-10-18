import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AuthGuard } from '../auth.guard';
import { AddAppointmentsComponent } from '../add-appointments/add-appointments.component';
import { HomeComponent } from '../home/home.component';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { MedicalHistoryComponent } from '../medical-history/medical-history.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { AddNewPatientComponent } from '../add-new-patient/add-new-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AddAppointmentPopupComponent } from '../add-appointment-popup/add-appointment-popup.component';
import { PatientSelectDialogComponent } from '../patient-select-dialog/patient-select-dialog.component';
import { PrescriptionComponent } from '../prescription/prescription.component';
import { AddDrugsComponent } from '../add-drugs/add-drugs.component';
import { DrugsDetailsComponent } from '../drugs-details/drugs-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    PatientDetailsComponent,
    MedicalHistoryComponent,
    AppointmentsComponent,
    AddNewPatientComponent,
    HeaderComponent,
    FooterComponent,
    PatientSelectDialogComponent,
    PrescriptionComponent,
    AddAppointmentsComponent,
    AddAppointmentPopupComponent,
    AddDrugsComponent,
    DrugsDetailsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [AuthGuard],
})
export class DashboardModule {}
