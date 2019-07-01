import { Component, OnInit } from '@angular/core';
import { ClientServicesService } from '../../ClientCallServicees/client-services.service';
import { GetAllFinshedRequests } from '../../ClientViewModels/get-all-finshed-requests';
import { NotificationShareService } from 'src/app/notification-share.service';
declare var $: any;

@Component({
  selector: 'app-client-requests-history',
  templateUrl: './client-requests-history.component.html',
  styleUrls: ['./client-requests-history.component.css']
})
export class ClientRequestsHistoryComponent implements OnInit {
  private connection: any;
  public proxy: any;
  public NumberOfNotifications:number=0;
  public url: string ="http://localhost:4700/ChatHub"
  ListFinshedRequests:GetAllFinshedRequests[];

  constructor(private ClientServices:ClientServicesService,private Notification:NotificationShareService) { }
  start():void
  {
   this.connection = $.hubConnection(this.url);
   this.proxy = this.connection.createHubProxy('ChatHub'); 
   this.proxy.on("send",(Notifcation:string,count:number)=>{
    //alert(count);
    
    this.Notification.updateCartCount(count);
     })
   this.connection.start().done((data: any) => {
  
   
   })
 }
  ngOnInit() {
    this.ClientServices.GetAllFinshedRequests().subscribe
    ((res)=>{this.ListFinshedRequests=res;
    console.log(res);
    this.start();
  }
    )
  }

}
