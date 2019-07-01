import { Component, OnInit } from '@angular/core';
import { NotificationShareService } from 'src/app/notification-share.service';
declare var $: any;
@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css']
})
export class ClientOrderComponent implements OnInit {
  private connection: any;
  public proxy: any;
  public NumberOfNotifications:number=0;
  public url: string ="http://localhost:4700/ChatHub"
  constructor(private Notification:NotificationShareService) { }
  start():void
  {
   this.connection = $.hubConnection(this.url);
   this.proxy = this.connection.createHubProxy('ChatHub'); 
   this.proxy.on("send",(Notifcation:string,count:number)=>{
    
    this.Notification.updateCartCount(count);
     })
   this.connection.start().done((data: any) => {
     alert('Connected to Processing Hub');
   
   })
 }
  ngOnInit() {
    this.start();
  }

}
