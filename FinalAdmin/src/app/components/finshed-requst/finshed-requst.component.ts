import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-finshed-requst',
  templateUrl: './finshed-requst.component.html',
  styleUrls: ['./finshed-requst.component.css']
})
export class FinshedRequstComponent implements OnInit {

  
  RequestList:Request[];
  // pageList:number[];
   driverID:string;


  constructor(private requestServices:RequestService,  private location:Location,
    
    private router:Router,private activeRoute:ActivatedRoute) { 
    //this.pageList=[1,2,3,4,5];
    //this.pageList.filter()
  }

  ngOnInit() {
    this.driverID=this.activeRoute.snapshot.params['DriverID'];
    this.requestServices.GetAllFinshedRequests(this.driverID)
    .subscribe((res) => {
      this.RequestList = res;
      console.log(res);
    },
    (err) => {
      console.log(err);
    });
   

  }
  goBack()
  {
    this.location.back();

  }

}
