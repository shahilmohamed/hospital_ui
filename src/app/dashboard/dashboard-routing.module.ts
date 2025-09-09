import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppointmentsComponent } from 'src/app/add-appointments/add-appointments.component';
import { AuthGuard } from '../auth.guard';
import { HomeComponent } from 'src/app/home/home.component';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { MedicalHistoryComponent } from '../medical-history/medical-history.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { AddNewPatientComponent } from '../add-new-patient/add-new-patient.component';
import { PrescriptionComponent } from '../prescription/prescription.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent, canActivate:[AuthGuard]
  },
  {
    path:'home', component: HomeComponent, canActivate:[AuthGuard]
  },
  {
    path:'patients', component: PatientDetailsComponent, canActivate:[AuthGuard]
  },
  { 
    path: 'medical-history/:id', component: MedicalHistoryComponent, canActivate:[AuthGuard]

  },
  {
    path:'addAppointment', component: AddAppointmentsComponent, canActivate:[AuthGuard]
  },
  {
    path: 'viewAppointments', component: AppointmentsComponent, canActivate:[AuthGuard]
  },
  {
    path: 'addNewpatient', component: AddNewPatientComponent, canActivate:[AuthGuard]
  },
  {
    path: 'addPrescription', component: PrescriptionComponent, canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
