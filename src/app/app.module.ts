import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { HttpClientModule } from '@angular/common/http';
import { AddAppointmentsComponent } from './add-appointments/add-appointments.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AddNewPatientComponent } from './add-new-patient/add-new-patient.component';
import { FooterComponent } from './footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddAppointmentPopupComponent } from './add-appointment-popup/add-appointment-popup.component';
import { PatientSelectDialogComponent } from './patient-select-dialog/patient-select-dialog.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    NotFoundComponent,
    HomeComponent,
    PatientDetailsComponent,
    MedicalHistoryComponent,
    AddAppointmentsComponent,
    AppointmentsComponent,
    AddNewPatientComponent,
    FooterComponent,
    AddAppointmentPopupComponent,
    PatientSelectDialogComponent,
    PrescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
