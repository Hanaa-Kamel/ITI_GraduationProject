import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetAllNotFinshedRequests } from '../../ClientViewModels/get-all-not-finshed-requests';
import { ClientServicesService } from '../../ClientCallServicees/client-services.service';
import { StarRatingComponent } from 'ng-starrating';
import { NotificationShareService } from 'src/app/notification-share.service';
declare var $: any;

@Component({
  selector: 'app-client-say-finished',
  templateUrl: './client-say-finished.component.html',
  styleUrls: ['./client-say-finished.component.css']
})
export class ClientSayFinishedComponent implements OnInit {
  private connection: any;
  public proxy: any;
  public NumberOfNotifications:number=0;
  public url: string ="http://localhost:4700/ChatHub"
  StarRate:number;
  constructor( private activatedRoute: ActivatedRoute,private ClientServices:ClientServicesService
    ,private Notification:NotificationShareService) { }

  start():void
  {
   this.connection = $.hubConnection(this.url);
   this.proxy = this.connection.createHubProxy('ChatHub'); 
   this.proxy.on("send",(Notifcation:string,count:number)=>{
    
    this.Notification.updateCartCount(count);
     })
  //  this.connection.start().done((data: any) => {
  //    ////alert('Connected to Processing Hub');
   
  //  })
 }
  ngOnInit() {
    this.start();
  }
     selRequestID = this.activatedRoute.snapshot.params['RequestID'];

    onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
      // alert(`Old Value:${$event.oldValue}, 
      //   New Value: ${$event.newValue}, 
      //   Checked Color: ${$event.starRating.checkedcolor}, 
      //   Unchecked Color: ${$event.starRating.uncheckedcolor}`
      //   );
       
       this.StarRate=$event.newValue;
      
       //this.ISStar=true;
     ////alert(this.StarRate);
    }
    
    Finished(bill:number){
    this.ClientServices.PayBill(this.selRequestID,bill,this.StarRate).subscribe();    }
  }


