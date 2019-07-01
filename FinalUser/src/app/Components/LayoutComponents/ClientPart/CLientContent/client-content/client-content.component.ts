import { Component, OnInit } from '@angular/core';
import { ClientServicesService } from '../../ClientCallServicees/client-services.service';
import { GetAllFinshedRequests } from '../../ClientViewModels/get-all-finshed-requests';
import { NotificationShareService } from 'src/app/notification-share.service';
declare var $: any;
@Component({
  selector: 'app-client-content',
  templateUrl: './client-content.component.html',
  styleUrls: ['./client-content.component.css']
})
export class ClientContentComponent implements OnInit {
  private connection: any;
  public proxy: any;
  public NumberOfNotifications:number=0;
  public url: string ="http://localhost:4700/ChatHub"
  constructor(private Notification:NotificationShareService) { 
    
  }

  ngOnInit() {
 

    console.log(localStorage.getItem('ClientID'));
    console.log(localStorage.getItem('ClientToken'));


    this.start();
 

}
start():void
 {
  this.connection = $.hubConnection(this.url);
  this.proxy = this.connection.createHubProxy('ChatHub'); 
  this.proxy.on("send",(Notifcation:string,count:number)=>{
   //this. NumberOfNotifications=+1;
  //  //alert("NewNotification");
  //  //alert(Notifcation);
    //this.NumberOfNotifications=count;
  //  //alert(this.NumberOfNotifications);
   this.Notification.updateCartCount(count);
    })
  this.connection.start().done((data: any) => {
    //alert('Connected to Processing Hub');
   this.addConnection(localStorage.getItem('ClientID'));
  })
}
public addConnection(UserID:string): void {
this.proxy.invoke('StratConnection',UserID)
}

}
