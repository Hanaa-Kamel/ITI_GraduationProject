import { ApiService } from 'src/app/shared/services/api.service';
import { Injectable } from '@angular/core';
import { LoginViewModel } from './login/login.model';
import { Observable } from 'rxjs';
import { IDandToken } from 'src/app/ViewModel/idand-token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService,private httpClient:HttpClient) { }
 
removeUserActions()
{
  localStorage.removeItem("Roles");
}
signOut() {
  this.removeUserActions();
  localStorage.removeItem("Roles");
  return this.apiService.get(`/User/SignOut`);

}

// login(model:LoginViewModel){
//   return this.apiService.post(`/User/login`,model);

// }
  

Login(Name:string,Password:string):Observable<IDandToken>

  { 
    const httpOptions = {
      headers: new HttpHeaders({
        
        'Accept': ' */*',
        'Content-Type':'application/json',

'Authorization': `Bearer ${localStorage.getItem("Token")}`,

      })
    };
    var credential='?name='+Name+'&password='+Password;
    return this.httpClient.post<IDandToken>(`http://localhost:4700/api/AccountAdmin/Login${credential}`,httpOptions);
  }

}
