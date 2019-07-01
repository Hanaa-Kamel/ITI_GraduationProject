import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './Components/LayoutComponents/Register/register/register.component';
import { ContentComponent } from './Components/LayoutComponents/Content/content/content.component';
import { LoginComponent } from './Components/LayoutComponents/LogIn/login/login.component';
import { RegisterOptionsComponent } from './Components/LayoutComponents/RegisterOptions/register-options/register-options.component';
import { UserRegisterComponent } from './Components/LayoutComponents/UserRegister/user-register/user-register.component';
import { UserLoginComponent } from './Components/LayoutComponents/UserLogin/user-login/user-login.component';
import { LoginOptionsComponent } from './Components/LayoutComponents/LoginOption/login-options/login-options.component';
import { ContactUsComponent } from './Components/LayoutComponents/ContactUs/contact-us/contact-us.component';
import { ClientServicesComponent } from './Components/LayoutComponents/ClientServices/client-services/client-services.component';
import { DriverServicesComponent } from './Components/LayoutComponents/DriverServices/driver-services/driver-services.component';
import { AboutUsComponent } from './Components/LayoutComponents/AboutUS/about-us/about-us.component';
import { DriverContentComponent } from './Components/LayoutComponents/DriverPart/DriverContent/driver-content/driver-content.component';
import { DriverPersonalPageComponent } from './Components/LayoutComponents/DriverPart/DriverPersonalPage/driver-personal-page/driver-personal-page.component';
import { ClientContentComponent } from './Components/LayoutComponents/ClientPart/CLientContent/client-content/client-content.component';
import { ClientRequestComponent } from './Components/LayoutComponents/ClientPart/ClientRequest/client-request/client-request.component';
import { AllFinishedRequestsComponent } from './Components/LayoutComponents/DriverPart/DriverFinshedRequests/all-finished-requests/all-finished-requests.component';
import { DriverAllNotFinshedRequestsComponent } from './Components/LayoutComponents/DriverPart/DriverAllNotFinshedRequests/driver-all-not-finshed-requests/driver-all-not-finshed-requests.component';
import { ClientRequestsHistoryComponent } from './Components/LayoutComponents/ClientPart/ClientRequestsHistory/client-requests-history/client-requests-history.component';
import { CurrentRequestsComponent } from './Components/LayoutComponents/ClientPart/CurrentRequests/current-requests/current-requests.component';
import { ClientSayFinishedComponent } from './Components/LayoutComponents/ClientPart/ClientSayFinished/client-say-finished/client-say-finished.component';

const routes: Routes = [

  {path:"home", component:ContentComponent},
  {path:"RegisterOption", component:RegisterOptionsComponent},
  {path:"LoginOption", component:LoginOptionsComponent},
  {path:"Register", component:RegisterComponent},
  {path:"UserRegister", component:UserRegisterComponent},
  {path:"Login", component:LoginComponent},
  {path:"UserLogin", component:UserLoginComponent},
  {path:"ClientServices", component:ClientServicesComponent},
  {path:"DriverServices", component:DriverServicesComponent},
  {path:"AboutUs", component:AboutUsComponent},
  //{path:"ContactUs", component:ContactUsComponent},

 /* start driverpart*/
 {path:"DriverContent", component:DriverContentComponent},
 {path:"DriverPersonalPage", component:DriverPersonalPageComponent},
 {path:"FinishedAllRequests", component:AllFinishedRequestsComponent},
 {path:"FinishedNotAllRequests", component:DriverAllNotFinshedRequestsComponent},

 /*end driverpart*/

  /* start Clientpart*/
  {path:"ClientContent", component:ClientContentComponent},
  {path:"ClientRequest", component:ClientRequestComponent},
  {path:"ClientRequestsHistory", component:ClientRequestsHistoryComponent},
  {path:"CurrentRequests",component:CurrentRequestsComponent},
  // {path:"ClientSayFinished",component:ClientSayFinishedComponent},
  {path: 'ClientSay/:RequestID', component:ClientSayFinishedComponent},
 
  /*end Clientpart*/


  {path:'',redirectTo:'/home' ,pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
