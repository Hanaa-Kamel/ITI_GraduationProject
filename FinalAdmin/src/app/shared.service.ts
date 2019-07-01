import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Applicant } from './ViewModel/applicant';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  applicants:Applicant[]=[];
  private currentCartCount = new BehaviorSubject(this.applicants);
  currentMessage = this.currentCartCount.asObservable();

updateCartCount(count: Applicant[]) {
 // alert(count);
  this.currentCartCount.next(count)
}
  constructor() { 
    
  }
}
