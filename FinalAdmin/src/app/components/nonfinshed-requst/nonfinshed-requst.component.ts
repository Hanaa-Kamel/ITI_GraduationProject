import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-nonfinshed-requst',
  templateUrl: './nonfinshed-requst.component.html',
  styleUrls: ['./nonfinshed-requst.component.css']
})
export class NonfinshedRequstComponent implements OnInit {
  RequestList:Request[];
  // pageList:number[];
   driverID:string;


  constructor(private requestServices:RequestService, private location:Location,
    private router:Router,private activeRoute:ActivatedRoute) { 
    //this.pageList=[1,2,3,4,5];
    //this.pageList.filter()
  }

  ngOnInit() {
    this.driverID=this.activeRoute.snapshot.params['DriverID'];
    this.requestServices.GetAllNotFinshedRequests(this.driverID)
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
