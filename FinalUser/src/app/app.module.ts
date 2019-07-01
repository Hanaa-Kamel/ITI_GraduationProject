import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/LayoutComponents/Header/header/header.component';
import { ContentComponent } from './Components/LayoutComponents/Content/content/content.component';
import { FooterComponent } from './Components/LayoutComponents/Footer/footer/footer.component';
import { ContactUsComponent } from './Components/LayoutComponents/ContactUs/contact-us/contact-us.component';
import { RegisterComponent } from './Components/LayoutComponents/Register/register/register.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './Components/LayoutComponents/LogIn/login/login.component';
import { RegisterOptionsComponent } from './Components/LayoutComponents/RegisterOptions/register-options/register-options.component';
import { UserRegisterComponent } from './Components/LayoutComponents/UserRegister/user-register/user-register.component';
import { UserLoginComponent } from './Components/LayoutComponents/UserLogin/user-login/user-login.component';
import { LoginOptionsComponent } from './Components/LayoutComponents/LoginOption/login-options/login-options.component';
import { DriverServicesComponent } from './Components/LayoutComponents/DriverServices/driver-services/driver-services.component';
import { ClientServicesComponent } from './Components/LayoutComponents/ClientServices/client-services/client-services.component';
import { AboutUsComponent } from './Components/LayoutComponents/AboutUS/about-us/about-us.component';
import { DriverHeaderComponent } from './Components/LayoutComponents/DriverPart/DriverHeader/driver-header/driver-header.component';
import { DriverContentComponent } from './Components/LayoutComponents/DriverPart/DriverContent/driver-content/driver-content.component';
import { DriverPersonalPageComponent } from './Components/LayoutComponents/DriverPart/DriverPersonalPage/driver-personal-page/driver-personal-page.component';
import { ClientheaderComponent } from './Components/LayoutComponents/ClientPart/ClientHeader/clientheader/clientheader.component';
import { ClientContentComponent } from './Components/LayoutComponents/ClientPart/CLientContent/client-content/client-content.component';
import { ClientRequestComponent } from './Components/LayoutComponents/ClientPart/ClientRequest/client-request/client-request.component';
import { ClientOrderComponent } from './Components/LayoutComponents/ClientPart/ClientOrder/client-order/client-order.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';  
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllFinishedRequestsComponent } from './Components/LayoutComponents/DriverPart/DriverFinshedRequests/all-finished-requests/all-finished-requests.component';
import { DriverAllNotFinshedRequestsComponent } from './Components/LayoutComponents/DriverPart/DriverAllNotFinshedRequests/driver-all-not-finshed-requests/driver-all-not-finshed-requests.component';
import { RatingModule } from 'ng-starrating';
import { ClientRequestsHistoryComponent } from './Components/LayoutComponents/ClientPart/ClientRequestsHistory/client-requests-history/client-requests-history.component';
import { CurrentRequestsComponent } from './Components/LayoutComponents/ClientPart/CurrentRequests/current-requests/current-requests.component';
import { UpperHeaderComponent } from './Components/LayoutComponents/UpperHeader/upper-header/upper-header.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { ClientSayFinishedComponent } from './Components/LayoutComponents/ClientPart/ClientSayFinished/client-say-finished/client-say-finished.component';

//import {PopupModule} from 'ng2-opd-popup'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ContactUsComponent,
    RegisterComponent,
    LoginComponent,
    RegisterOptionsComponent,
    UserRegisterComponent,
    UserLoginComponent,
    LoginOptionsComponent,
    DriverServicesComponent,
    ClientServicesComponent,
    AboutUsComponent,
    DriverHeaderComponent,
    DriverContentComponent,
    DriverPersonalPageComponent,
    ClientheaderComponent,
    ClientContentComponent,
    ClientRequestComponent,
    ClientOrderComponent,
    AllFinishedRequestsComponent,
    DriverAllNotFinshedRequestsComponent,
    ClientRequestsHistoryComponent,
    CurrentRequestsComponent,
    UpperHeaderComponent,
    ClientSayFinishedComponent,
    //PopupModule.forRoot()
    //StarRatingComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,NgxPaginationModule,Ng2SearchPipeModule,
   RatingModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
