import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationShareService {
  private currentCartCount = new BehaviorSubject(0);
  currentMessage = this.currentCartCount.asObservable();

updateCartCount(count: number) {
 // alert(count);
  this.currentCartCount.next(count)
}
  constructor() { 
    
  }
}
