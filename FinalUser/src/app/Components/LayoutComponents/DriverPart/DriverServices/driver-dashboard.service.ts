import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { DriverDashboard } from '../DriverViewModels/driver-dashboard';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class DriverDashboardService {

  constructor(private httpClient:HttpClient) { 
  }

  getAllRequests(): Observable <DriverDashboard[]>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        
        // 'Accept': ' */*',
        
        // 'Authorization': `Bearer ${localStorage.getItem('Token')}`

        'Content-Type':'application/json',
        'Accept': ' */*',
     'Authorization': `Bearer ${localStorage.getItem('Token')}`
     

      })
    };
    console.log("hello");
    return this.httpClient.get<DriverDashboard[]>
    (`${environment.API_URL}Driver/GetAllNotTakedRequests`
    ,httpOptions);
    
  }

  AcceptRequest(requestId:any,Userid:string)
  {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Accept': ' */*',
     'Authorization': `Bearer ${localStorage.getItem('Token')}`
    

      })
    };
    
  //  //alert(localStorage.getItem('Token'));
    var paramters='?requestId='+requestId+'&Userid='+Userid;
    return this.httpClient.get<any>
    (`${environment.API_URL}Driver/AcceptRequest${paramters}`
    ,httpOptions);
   
  }

 /*********GetFinishedNotAllRequests */
  userId:string;
  DriverGetAllFinshedRequests(userId): Observable <DriverDashboard[]>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        
        // 'Accept': ' */*',
        
        // 'Authorization': `Bearer ${localStorage.getItem('Token')}`

        'Content-Type':'application/json',
        'Accept': ' */*',
     'Authorization': `Bearer ${localStorage.getItem('Token')}`
     

      })
    };
    console.log("GetFinishedAllRequests");
    
    return this.httpClient.get<DriverDashboard[]>
    (`${environment.API_URL}Driver/GetAllFinshedRequests?userID=${userId}`
    ,httpOptions);
    
  }


  /*********GetFinishedAllRequests */
 
 DriverGetAllNotFinshedRequests(userId): Observable <DriverDashboard[]>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        
        // 'Accept': ' */*',
        
        // 'Authorization': `Bearer ${localStorage.getItem('Token')}`

        'Content-Type':'application/json',
        'Accept': ' */*',
     'Authorization': `Bearer ${localStorage.getItem('Token')}`
     

      })
    };
    console.log("GetFinishedAllRequests");
    
    return this.httpClient.get<DriverDashboard[]>
    (`${environment.API_URL}Driver/GetAllNotFinshedRequests?userID=${userId}`
    ,httpOptions);
    
  }





/**********Driver give client rate */


PutRateToClient(requestid:number,rate:number):Observable<any>
{
  //alert(rate);
  //alert(requestid);

  const httpOptions = {
    headers: new HttpHeaders({
      
      // 'Accept': ' */*',
      
      // 'Authorization': `Bearer ${localStorage.getItem('Token')}`

      'Content-Type':'application/json',
      'Accept': ' */*',
   'Authorization': `Bearer ${localStorage.getItem('Token')}`
   

    })
  };

  var RatedRequest='?requestid='+requestid+'&rate='+rate;
  return this.httpClient.get<any>
  (`${environment.API_URL}Driver/PutRate${RatedRequest}`
  ,httpOptions);
  
}


}

/*************End Driver give client rate********** */