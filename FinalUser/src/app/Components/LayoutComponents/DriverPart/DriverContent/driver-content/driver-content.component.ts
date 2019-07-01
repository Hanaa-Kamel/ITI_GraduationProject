import { Component, OnInit } from '@angular/core';
import {  DriverDashboardService } from '../../DriverServices/driver-dashboard.service';
import { DriverDashboard } from '../../DriverViewModels/driver-dashboard';
import { ActivatedRoute } from '@angular/router';



declare var $: any;

@Component({
  selector: 'app-driver-content',
  templateUrl: './driver-content.component.html',
  styleUrls: ['./driver-content.component.css']
})
export class DriverContentComponent implements OnInit {
  private connection: any;
  public proxy: any;
  public message:string;
  public Notificationnumber:number;
  public url: string ="http://localhost:4700/ChatHub"
  ClientRequests:DriverDashboard[];
  userID=localStorage.getItem('ID');
  
  
  constructor(public DriverServices:DriverDashboardService,private Activated_Route:ActivatedRoute
    ) { 
    //  this.Notificationnumber=10;
      this.connection = $.hubConnection(this.url);
      this.proxy = this.connection.createHubProxy('ChatHub'); 
      this.proxy.on("send",()=>{
      
      this.DriverServices.getAllRequests().subscribe(
        (res)=>{this.ClientRequests=res;
        console.log(res)})
      
      });
      this.proxy.on("Refresh",()=>{
        //alert("DDDDDDDDDDDDDDDDDDdd");
        this.DriverServices.getAllRequests().subscribe(
          (res)=>{this.ClientRequests=res;
          console.log(res)})
        
        });
       // list=[];
     //https://chsakell.com/2016/10/10/real-time-applications-using-asp-net-core-signalr-angular/
     //https://www.freecodecamp.org/news/48-answers-on-stack-overflow-to-the-most-popular-angular-questions-52f9eb430ab0/
       
        //https://www.edureka.co/blog/angular-tutorial/
       //   });
  }
  public connectstart(UserID:string): void {
   
    this.connection.start().done((data: any) => {
        //alert('Connected to Processing Hub');
       this.addConnection(UserID);
      })
  }
  public addConnection(UserID:string): void {
    this.proxy.invoke('StratConnection',UserID)
  }
  public send(clientID:string): void {
    ////alert(clientID);
    this.proxy.invoke('SendNotifcation',clientID,this.message)
  }
  ngOnInit() {

    this.DriverServices.getAllRequests().subscribe(
      (res)=>{this.ClientRequests=res;
      console.log(res)
      this.connectstart(this.userID);},
      
      
    );



  }
     
  AcceptRequesst(Request:DriverDashboard,clientID:string)
  {
    /************* */
  //  id:number,clientID:string
    ////alert(this.userID);
    //alert(clientID);
    //alert(Request.RequestID);

      //alert("accept");
      this.DriverServices.AcceptRequest(Request.RequestID,this.userID)
      .subscribe(res=>{
        //console.log(res);
this.message=" لقد استلم أحد سائقينا طلبكم  "+Request.Location+Request.Destination +" وهو قيد التنفيذ"
        this.send(clientID);
      ////alert(this.hub.number)
      },
        err=>{//alert(err)
      
     
      })
     


     // //alert(this.hub.number);

    /*********** */
  }

}
