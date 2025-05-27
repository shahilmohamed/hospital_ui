import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { AddAppointmentsComponent } from './add-appointments/add-appointments.component';
import { AppointmentsComponent } from './appointments/appointments.component';

const routes: Routes = [
  {
    path:'', redirectTo:'/home', pathMatch:'full'
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'signup', component:SignUpComponent
  },
  {
    path:'dashboard', loadChildren:()=>import('./dashboard/dashboard/dashboard.module').then(m=>m.DashboardModule)
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
    path:'patients/addAppointment', component: AddAppointmentsComponent
  },
  {
    path: 'patients/viewAppointments', component: AppointmentsComponent
  },
  {
    path:'**', component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
