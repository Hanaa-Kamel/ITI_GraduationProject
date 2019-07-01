import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicantRegister } from './ViewModelsDriverApplicant/applicant-register';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApplicantRegisterService {

  constructor(private httpClient:HttpClient) { 

  }
PostApplicant(Applicant:ApplicantRegister,ImageFile:File){
  //alert(JSON.stringify(Applicant));
  const httpOptions = {
    headers: new HttpHeaders({
      
      'Accept': ' */*',
   

    })
  };
 // alert(`${environment.API_URL}Applicant/postApplicant`);
const  formData:FormData=new FormData();
formData.append('Applicant',JSON.stringify( Applicant));
formData.append('ImageFile',ImageFile);
return this.httpClient.post<any>(`${environment.API_URL}Applicant/postApplicant`,formData,httpOptions);

}
  
}
