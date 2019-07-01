import { Component, OnInit } from '@angular/core';
import { Driver } from 'selenium-webdriver/chrome';
import { DriverService } from 'src/app/services/driver.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Applicant } from 'src/app/ViewModel/applicant';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  driver:Driver;
  driverList:Applicant[];
  // pageList:number[];
   driverID:string;


  constructor(private DriverServices:DriverService,
    private router:Router,private activeRoute:ActivatedRoute) { 
    //this.pageList=[1,2,3,4,5];
    //this.pageList.filter()
  }

  ngOnInit() {
    this.driverID=this.activeRoute.snapshot.params['DriverID'];
    this.DriverServices.getAllDriver()
    .subscribe((res) => {
      this.driverList = res;
      console.log(res);
    },
    (err) => {
      console.log(err);
    });
   

  }
  Deletedriver(driverID:string)
  {
   // console.log(JSON.stringify(this.pro));
    this.DriverServices.DeleteDriver(driverID)
    .subscribe(
      (data) => {console.log (JSON.stringify(data)) },
      
      (err) => {console.log(err);
      });
      
    this.router.navigate(['/driver']);
  } 

}
