import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IDandToken } from '../ViewModels/idand-token';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private httpClient:HttpClient) { }
  Login(Name:string,Password:string):Observable<IDandToken>
  {
    //alert("aaaaaaaaaaaaaa");
    var credential='?name='+Name+'&password='+Password;
   
    return(this.httpClient.get<IDandToken>(`${environment.API_URL}AccountClient/Login${credential}`));
  }


  /***************************** */
  // private modals: any[] = [];

  // add(modal: any) {
  //     // add modal to array of active modals
  //     this.modals.push(modal);
  // }

  // remove(id: string) {
  //     // remove modal from array of active modals
  //     this.modals = this.modals.filter(x => x.id !== id);
  // }

  // open(id: string) {
  //     // open modal specified by id
  //     let modal: any = this.modals.filter(x => x.id === id)[0];
  //     modal.open();
  // }

  // close(id: string) {
  //     // close modal specified by id
  //     let modal: any = this.modals.filter(x => x.id === id)[0];
  //     modal.close();
  // }
  /***************************** */
}
