import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDandToken } from '../../UserLogin/ViewModels/idand-token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private httpClient:HttpClient) { 

  }
  Login(Name:string,Password:string):Observable<IDandToken>

  { var credential='?name='+Name+'&password='+Password;
    return this.httpClient.get<IDandToken>(`${environment.API_URL}AccountDriver/Login${credential}`);
  }
  

}
