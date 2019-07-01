import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Driver } from 'selenium-webdriver/edge';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  RequestList: Request[];
  

  constructor(private httpClient: HttpClient) { }

  GetAllNotFinshedRequests(driverID: string): Observable<Request[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*',

        'Authorization': `Bearer ${localStorage.getItem("Token")}`,

      })
    };
    return (this.httpClient
      .get<Request[]>(`${environment.API_URL}GetAllNotFinshedRequests?NationalId=${driverID}`, httpOptions));
  }
  


  GetAllFinshedRequests(driverID: string): Observable<Request[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*',

        'Authorization': `Bearer ${localStorage.getItem("Token")}`,

      })
    };
    return (this.httpClient
      .get<Request[]>(`${environment.API_URL}GetAllFinshedRequests?NationalId=${driverID}`, httpOptions));
  }

 




}
