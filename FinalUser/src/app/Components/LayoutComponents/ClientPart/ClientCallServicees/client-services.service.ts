import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observer, Observable } from 'rxjs';
import { GetAllFinshedRequests } from '../ClientViewModels/get-all-finshed-requests';
import { environment } from 'src/environments/environment.prod';
import { GetAllNotFinshedRequests } from '../ClientViewModels/get-all-not-finshed-requests';
import { DriverDashboard } from '../../DriverPart/DriverViewModels/driver-dashboard';

@Injectable({
  providedIn: 'root'
})
export class ClientServicesService {
  //AllFinshedRequests:GetAllFinshedRequests[];
  
  constructor(private httpClient:HttpClient) { }

  GetAllFinshedRequests( ):Observable<GetAllFinshedRequests[]>
  {
    let userID=localStorage.getItem('ClientID');
    // //alert(userID)
    const httpOptions = {
      headers: new HttpHeaders({
        
        // 'Accept': ' */*',
        
        // 'Authorization': `Bearer ${localStorage.getItem('ClientToken')}`

        // 'Content-Type':'application/json',
        'Accept': ' */*',
     'Authorization': `Bearer ${localStorage.getItem('ClientToken')}`
     

      })
    };
    
   
    return this.httpClient.get<GetAllFinshedRequests[]>(`${environment.API_URL}Client/GetAllFinshedRequests?userID=${userID}`,httpOptions);
  }

  /*****************************AllNotFinishedRequests */

  
  GetAllNotFinshedRequests( ):Observable<GetAllNotFinshedRequests[]>
  {
    let userID=localStorage.getItem('ClientID');
    // //alert(userID)
    const httpOptions = {
      headers: new HttpHeaders({
      
        'Accept': ' */*',
     'Authorization': `Bearer ${localStorage.getItem('ClientToken')}`
     

      })
    };
    
   
    return this.httpClient.get<GetAllNotFinshedRequests[]>(`${environment.API_URL}Client/GetAllNotFinshedRequests?userID=${userID}`,httpOptions);
  }


    /*****************************AllNotFinishedRequests */

  
    GetAllNotTakedRequests( ):Observable<GetAllNotFinshedRequests[]>
    {
      let userID=localStorage.getItem('ClientID');
      // //alert(userID)
      const httpOptions = {
        headers: new HttpHeaders({
          
         
          'Accept': ' */*',
       'Authorization': `Bearer ${localStorage.getItem('ClientToken')}`
       
  
        })
      };
      
     
      return this.httpClient.get<GetAllNotFinshedRequests[]>(`${environment.API_URL}Client/GetAllNotTakedRequests?userID=${userID}`,httpOptions);
    }
    
    /***************************CancelRequests */
    CancelRequest(RequestID:number):Observable<any>
    {
      
      const httpOptions = {
        headers: new HttpHeaders({
          
         
          'Accept': ' */*',
       'Authorization': `Bearer ${localStorage.getItem('ClientToken')}`
       
  
        })
      };
      
     
      return this.httpClient.post<any>(`${environment.API_URL}Client/CancelRequest?RequestID=${RequestID}`,httpOptions);

    }

     /***************************PayBill */
     PayBill(RequestID:number,Bill:number,Rate:number):Observable<any>
     {
       ////alert("dkkkkkkkkk");
       const httpOptions = {
         headers: new HttpHeaders({
           
           
           'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('ClientToken')}`
        
   
         })
       };
       console.log(localStorage.getItem('ClientID'));
       console.log(localStorage.getItem('ClientToken'));
    // return this.httpClient.get<any>
    // (`${environment.API_URL}Driver/AcceptRequest${paramters}`
    // ,httpOptions);
    var paramters='?TripID='+RequestID+'&Bill='+Bill+'&Rate='+Rate;
       return this.httpClient.get<any>(`${environment.API_URL}Client/PayBill${paramters}`,httpOptions);
 
     }


     GetNotifcationsNumber( ):Observable<number>
  {
    let userID=localStorage.getItem('ClientID');
    // ////alert(userID)
    const httpOptions = {
      headers: new HttpHeaders({
      
        'Accept': ' */*',
     'Authorization': `Bearer ${localStorage.getItem('ClientToken')}`
     

      })
    };
    
   
    return this.httpClient.get<number>(`${environment.API_URL}Client/GetNotifcationsNumber?userID=${userID}`,httpOptions);
  }

  GetNotifcations( ):Observable<string[]>
  {
    let userID=localStorage.getItem('ClientID');
    // ////alert(userID)
    const httpOptions = {
      headers: new HttpHeaders({
      
        'Accept': ' */*',
     'Authorization': `Bearer ${localStorage.getItem('ClientToken')}`
     

      })
    };
    
   
    return this.httpClient.get<string[]>(`${environment.API_URL}Client/GetNotifcations?userID=${userID}`,httpOptions);
  }
    /*****************************AllNotFinishedRequests */
    AddRequest(Request:DriverDashboard):Observable<any>
    {
      
      const httpOptions = {
        headers: new HttpHeaders({
          
          // 'Accept': ' */*',
          
          // 'Authorization': `Bearer ${localStorage.getItem('Token')}`
  
          'Content-Type':'application/json',
          'Accept': ' */*',
       'Authorization': `Bearer ${localStorage.getItem('ClientToken')}`
       
  
        })
      };
      
     
   // return this.httpClient.get<any>
   // (`${environment.API_URL}Driver/AcceptRequest${paramters}`
   // ,httpOptions);
   var  userID=localStorage.getItem('ClientID');
      return this.httpClient.post<any>(`${environment.API_URL}Client/PostRequest?userid=${userID}`,JSON.stringify( Request),httpOptions);
  
    }
  
}
