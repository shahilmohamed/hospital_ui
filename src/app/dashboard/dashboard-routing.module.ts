import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppointmentsComponent } from 'src/app/add-appointments/add-appointments.component';
import { AuthGuard } from 'src/app/auth.guard';
import { HomeComponent } from 'src/app/home/home.component';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { MedicalHistoryComponent } from '../medical-history/medical-history.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { AddNewPatientComponent } from '../add-new-patient/add-new-patient.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  {
    path:'home', component: HomeComponent
  },
  {
    path:'patients', component: PatientDetailsComponent
  },
  { 
    path: 'medical-history/:id', component: MedicalHistoryComponent 

  },
  {
    path:'addAppointment', component: AddAppointmentsComponent
  },
  {
    path: 'viewAppointments', component: AppointmentsComponent
  },
  {
    path: 'addNewpatient', component: AddNewPatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
