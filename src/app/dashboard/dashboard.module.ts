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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AddAppointmentPopupComponent } from '../add-appointment-popup/add-appointment-popup.component';
import { PatientSelectDialogComponent } from '../patient-select-dialog/patient-select-dialog.component';
import { PrescriptionComponent } from '../prescription/prescription.component';

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
    AddAppointmentPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [AuthGuard],
})
export class DashboardModule {}
