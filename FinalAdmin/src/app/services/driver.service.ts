import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Applicant } from '../ViewModel/applicant';
import { Driver } from '../ViewModel/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  DriverList: Driver[];
  applicantListforAllDrivers:Applicant[];

  constructor(private httpClient: HttpClient) { }

  getAllDriver(): Observable<Applicant[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*',

         'Authorization': `Bearer ${localStorage.getItem("Token")}`,

      })
    };
    return (this.httpClient
      .get<Applicant[]>(`${environment.API_URL}GetAllDrivers`, httpOptions));
  }



  getDriver(driverID: string): Observable<Driver> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*',

        'Authorization': `Bearer ${localStorage.getItem("Token")}`,

      })
    };
    return this.httpClient
      .get<Driver>(`${environment.API_URL}getDriver/?NationalId=${driverID}`, httpOptions);
  }

  insertDriver(newdriver: Applicant): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        
        'Accept': ' */*',
        'Content-Type':'application/json',

'Authorization': `Bearer ${localStorage.getItem("Token")}`,

      })
    };
    alert(JSON.stringify("mnnna0"));
     const formData: FormData = new FormData();

    
     
     alert( JSON.stringify(newdriver));

    
return this.httpClient
.post <any>(`${environment.API_URL}RegistrationDriver`,JSON.stringify(newdriver),httpOptions);

   
  }



  DeleteDriver(driverID: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*',

        'Authorization': `Bearer ${localStorage.getItem("Token")}`,

      })
    };
    return this.httpClient.delete<any>(`${environment.API_URL}DeleteDriver/?id=${driverID}`, httpOptions);
  }



}
