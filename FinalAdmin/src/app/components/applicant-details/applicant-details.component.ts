import { Component, OnInit, OnChanges } from '@angular/core';
import { Applicant } from 'src/app/ViewModel/applicant';
import { ApplicantService } from 'src/app/services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Driver } from 'src/app/ViewModel/driver';
import { DriverService } from 'src/app/services/driver.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css']
})
export class ApplicantDetailsComponent implements OnInit,OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.AplService.getAllApplicants()
    .subscribe((res) => {
      this.ApplicantList = res;
      console.log(res);
    },
    (err) => {
      console.log(err);
    });
  
  }

  selectedApplicant: Applicant;
  CurrentApplicant:Applicant;
  AppID:string;
  ApplicantList:Applicant[];
  constructor(private AplService: ApplicantService
    , private activatedRoute: ActivatedRoute,
     private location:Location,
     private router:Router,
     private driverServices:DriverService,private shared:SharedService
    ) { }

  ngOnInit() {
    this.AppID=this.activatedRoute.snapshot.params['AppID'];

    this.AplService.getApplicant(this.AppID)
    .subscribe((res) => {
      this.CurrentApplicant = res;
      console.log(res);
      console.log(this.CurrentApplicant.NationalID);
    },
    (err) => {
      console.log(err);
    });
  }

 

  

  goBack() {
    this.location.back();

  }

  AddDriver()
  {
    this.driverServices.insertDriver(this.CurrentApplicant)
    .subscribe((data) => {console.log (JSON.stringify(data)) 
      let applicants:Applicant[]=[];
      this.AplService.getAllApplicants().subscribe(res=>{applicants=res
      this.shared.updateCartCount(res)});
      }
      
    );
    this.router.navigateByUrl("/driver");
   // this.router.navigate(['/driver']);
  }
  DeleteApplicant(AppID:string)
  {
   // console.log(JSON.stringify(this.AppID));
    this.AplService.DeleteApplicant(AppID)
    .subscribe(
      (data) => {console.log (JSON.stringify(data)) 
      let applicants:Applicant[]=[];
      this.AplService.getAllApplicants().subscribe(res=>{applicants=res
      this.shared.updateCartCount(res)});
      },
      
      (err) => {console.log(err);
      });
      
   // this.router.navigate(['/applicant']);
    
    this.router.navigateByUrl("/applicant");
   
  
  }

}
