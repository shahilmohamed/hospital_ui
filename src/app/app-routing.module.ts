import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path:'', redirectTo:'dashboard', pathMatch:'full'
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'signup', component:SignUpComponent
  },
  {
    path:'dashboard', loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
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
