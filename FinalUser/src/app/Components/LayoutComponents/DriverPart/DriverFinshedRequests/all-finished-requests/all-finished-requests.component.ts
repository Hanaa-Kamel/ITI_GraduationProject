import { Component, OnInit } from '@angular/core';
import { DriverDashboardService } from '../../DriverServices/driver-dashboard.service';
import { DriverDashboard } from '../../DriverViewModels/driver-dashboard';
import { StarRatingComponent } from 'ng-starrating';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-all-finished-requests',
  templateUrl: './all-finished-requests.component.html',
  styleUrls: ['./all-finished-requests.component.css']
})
export class AllFinishedRequestsComponent implements OnInit {
   userID=localStorage.getItem('ID');
   ListOfGetFinishedAllRequests:DriverDashboard[];
   StarRate:number;
   RequestID:number;
   ISStar:boolean=false;
  




constructor( private activatedRoute: ActivatedRoute,private GetAllRequests:DriverDashboardService) { }


ngOnInit() {
  this.GetAllRequests.DriverGetAllFinshedRequests(this.userID).subscribe(
    (res)=>{this.ListOfGetFinishedAllRequests=res;
    console.log(res)},
    
    
  );
}
   
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    // alert(`Old Value:${$event.oldValue}, 
    //   New Value: ${$event.newValue}, 
    //   Checked Color: ${$event.starRating.checkedcolor}, 
    //   Unchecked Color: ${$event.starRating.uncheckedcolor}`
    //   );
     
     this.StarRate=$event.newValue;
    
    
  }


  PutRate(RequestID:number)
  {
    this.GetAllRequests.PutRateToClient(RequestID,this.StarRate).subscribe();
    //this.ISStar=true;
  //alert(this.StarRate);
  }
  
 
}
