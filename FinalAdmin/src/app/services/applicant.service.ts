import { Injectable } from '@angular/core';
import { Applicant } from '../ViewModel/applicant';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http' 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  APlicantList: Applicant[];

  constructor(private httpClient: HttpClient) { }

  getAllApplicants(): Observable<Applicant[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*',

        'Authorization': `Bearer ${localStorage.getItem("Token")}`,

      })
    };
    return (this.httpClient
      .get<Applicant[]>(`${environment.API_URL}GetAllApplicant`, httpOptions));
  }



  getApplicant(AppID: string): Observable<Applicant> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*',

       'Authorization': `Bearer ${localStorage.getItem("Token")}`,

      })
    };
    return this.httpClient
      .get<Applicant>(`${environment.API_URL}getApplicant/?NationalID=${AppID}`, httpOptions);
  }

  

  DeleteApplicant(AppID: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*',

       'Authorization': `Bearer ${localStorage.getItem("Token")}`,

      })
    };
    return this.httpClient.delete<any>(`${environment.API_URL}DeleteApplicant/?id=${AppID}`, httpOptions);
  }


}
