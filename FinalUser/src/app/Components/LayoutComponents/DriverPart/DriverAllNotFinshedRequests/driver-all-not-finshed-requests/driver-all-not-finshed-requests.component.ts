import { Component, OnInit } from '@angular/core';
import { DriverDashboard } from '../../DriverViewModels/driver-dashboard';
import { DriverDashboardService } from '../../DriverServices/driver-dashboard.service';

@Component({
  selector: 'app-driver-all-not-finshed-requests',
  templateUrl: './driver-all-not-finshed-requests.component.html',
  styleUrls: ['./driver-all-not-finshed-requests.component.css']
})
export class DriverAllNotFinshedRequestsComponent implements OnInit {

  userID=localStorage.getItem('ID');
  ListOfFinishedAllRequests:DriverDashboard[];
  constructor(private DriverServices:DriverDashboardService ) { }

  ngOnInit() {

    this.DriverServices.DriverGetAllNotFinshedRequests(this.userID).subscribe(
      (res)=>{this.ListOfFinishedAllRequests=res;
      console.log(res)},
      
    );
  }

}
