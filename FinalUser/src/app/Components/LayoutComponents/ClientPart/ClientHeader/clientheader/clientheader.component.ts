import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationShareService } from 'src/app/notification-share.service';
import { ClientServicesService } from '../../ClientCallServicees/client-services.service';


@Component({
  selector: 'app-clientheader',
  templateUrl: './clientheader.component.html',
  styleUrls: ['./clientheader.component.css']
})
export class ClientheaderComponent implements OnInit{
  ISLogin:boolean=false;
  Status:boolean;

 public NumberOfNotifications:number=0;
  constructor(private router:Router,private Notification:NotificationShareService,private client:ClientServicesService) { 

    // this.Notification.currentMessage.subscribe(msg => this.NumberOfNotifications = msg);
  }

  ngOnInit() {
    this.client.GetNotifcationsNumber().subscribe(res=>{this.NumberOfNotifications=res});

    this.Notification.currentMessage.subscribe((msg) => {this.NumberOfNotifications = msg;
    //  console.log(this.NumberOfNotifications)
   
  });


  }
  LogOut()

  {
    ////alert('lll');
    this.ISLogin=false;
    //localStorage.setItem('ClientID',null);
   // localStorage.setItem('ClientToken',null);
    // localStorage.setItem('ID',null);
    // localStorage.setItem('Token',null);
    localStorage.clear();
    //alert(localStorage.getItem('ID'))


this.router.navigate(['/home']);

  }
  
}
