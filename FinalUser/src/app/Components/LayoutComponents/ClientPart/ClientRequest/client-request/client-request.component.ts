import { Component, OnInit } from '@angular/core';
import { NotificationShareService } from 'src/app/notification-share.service';
import { DriverDashboard } from '../../../DriverPart/DriverViewModels/driver-dashboard';
import { ClientServicesService } from '../../ClientCallServicees/client-services.service';
declare var $: any;
@Component({
  selector: 'app-client-request',
  templateUrl: './client-request.component.html',
  styleUrls: ['./client-request.component.css']
})
export class ClientRequestComponent implements OnInit {
newRequest:DriverDashboard;
  private connection: any;
  public proxy: any;
  public NumberOfNotifications:number=0;
  public url: string ="http://localhost:4700/ChatHub"
  constructor(private Notification:NotificationShareService,private ClientService:ClientServicesService) { 
    this.newRequest=new DriverDashboard(0);
  }
  start():void
  {
   this.connection = $.hubConnection(this.url);
   this.proxy = this.connection.createHubProxy('ChatHub'); 
   this.proxy.on("send",(Notifcation:string,count:number)=>{
    //////alert(count);
    this.Notification.updateCartCount(count);
     })
     
      this.connection.start().done((data: any) => {
       
      
        
    })
 }
 public SendNotifcationAllDriver(): void {
  
  this.proxy.invoke('SendNotifcationAllDriver')
}

  ngOnInit() {
    this.start();
  }
  AddRequest()
  {
    this.ClientService.AddRequest(this.newRequest)
    .subscribe(
      (data) => {console.log (JSON.stringify(data));
        this.SendNotifcationAllDriver(); },
      (err) => {console.log(err);
      });

  }
}
