import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/ViewModel/driver';
import { DriverService } from 'src/app/services/driver.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApplicantService } from 'src/app/services/applicant.service';
import { Applicant } from 'src/app/ViewModel/applicant';


@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  selectedDriver: Driver;
  CurrentDriver:Driver;
  currentApplicantDriver:Applicant;
  DriverID:string;
  constructor(private DriverService:DriverService
    , private activatedRoute: ActivatedRoute,
     private location:Location,
     private router:Router,private DriverApplicantservice:ApplicantService
    ) { }

  ngOnInit() {
    this.DriverID=this.activatedRoute.snapshot.params['DriverID'];

    this.DriverService.getDriver(this.DriverID)
    .subscribe((res) => {
      this.CurrentDriver= res;
      console.log(res);
     // console.log(this.CurrentApplicant.NationalID);
    },
    (err) => {
      console.log(err);
    });

    this.DriverApplicantservice.getApplicant(this.DriverID)
    .subscribe((res)=>
    {
      this.currentApplicantDriver=res;
      console.log(res);
      // console.log(this.CurrentApplicant.NationalID);
     },
     (err) => {
       console.log(err);
     }
    

    );



  }

 

  

  goBack() {
    this.location.back();

  }

  AddDriver()
  {

  }
  DeleteDriver(AppID:string)
  {
   // console.log(JSON.stringify(this.AppID));
    this.DriverService.DeleteDriver(AppID)
    .subscribe(
      (data) => {console.log (JSON.stringify(data)) },
      
      (err) => {console.log(err);
      });
      
    this.router.navigate(['/driver']);
  }

}
