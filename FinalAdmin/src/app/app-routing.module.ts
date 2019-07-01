import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { DriverComponent } from './components/driver/driver.component';
import { ApplicantComponent } from './components/applicant/applicant.component';
import { ApplicantDetailsComponent } from './components/applicant-details/applicant-details.component';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { RequestTypeComponent } from './components/request-type/request-type.component';
import { FinshedRequstComponent } from './components/finshed-requst/finshed-requst.component';
import { NonfinshedRequstComponent } from './components/nonfinshed-requst/nonfinshed-requst.component';

const routes: Routes = [


 
  {
    path: 'home',
    component: LayoutComponent,
    loadChildren: './components/home/home.module#HomeModule',

  },

  {
    path: 'not-authorized',
    component: LayoutComponent,
    loadChildren: './components/not-authorized/not-authorized.module#NotAuthorizedModule',

  },


  {
    path: 'hr/job',
    component: LayoutComponent,
    loadChildren: './components/hr/job/job.module#JobModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'login',
    //component: LayoutComponent,
    loadChildren: './components/user/login/login.module#LoginModule'
  }
  ,
 

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {path: 'driver', component: DriverComponent },
  {path: 'applicant', component: ApplicantComponent },
  {path: 'ApplicantDetails/:AppID', component: ApplicantDetailsComponent },
  {path: 'DriverDetails/:DriverID', component: DriverDetailsComponent},
  {path: 'RequsetType/:DriverID', component : RequestTypeComponent},
  {path: 'Finshed/:DriverID', component : FinshedRequstComponent},
  {path: 'NotFinshed/:DriverID', component : NonfinshedRequstComponent},
  // ,
  // {
  //   path: '**',
  //   loadChildren: './components/shared/not-found/not-found.module#NotFoundModule'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
