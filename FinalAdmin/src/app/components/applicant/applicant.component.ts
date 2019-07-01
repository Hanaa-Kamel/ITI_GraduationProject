import { Component, OnInit, OnChanges } from '@angular/core';
import { Applicant } from 'src/app/ViewModel/applicant';
import { ApplicantService } from 'src/app/services/applicant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit,OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.ApplicantServices.getAllApplicants()
    .subscribe((res) => {
      this.ApplicantList = res;
      console.log(res);
    },
    (err) => {
      console.log(err);
    });
   
   
  }

  App:Applicant;
  ApplicantList:Applicant[];
  // pageList:number[];
   AppID:string;


  constructor(private ApplicantServices:ApplicantService,
    private router:Router,private activeRoute:ActivatedRoute,private shar:SharedService) { 
    //this.pageList=[1,2,3,4,5];
    //this.pageList.filter()
  }

  ngOnInit() {
    this.shar.currentMessage.subscribe(res=> this.ApplicantList=res);
    this.AppID=this.activeRoute.snapshot.params['AppID'];
    this.ApplicantServices.getAllApplicants()
    .subscribe((res) => {
      this.ApplicantList = res;
      console.log(res);
    },
    (err) => {
      console.log(err);
    });
   

  }
  

}
