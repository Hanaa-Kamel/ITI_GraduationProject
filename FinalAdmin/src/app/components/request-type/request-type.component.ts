import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Driver } from 'selenium-webdriver/firefox';
@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.component.html',
  styleUrls: ['./request-type.component.css']
})
export class RequestTypeComponent implements OnInit {


  driver:Driver;
  
  constructor(private activatedRoute: ActivatedRoute,
    private location:Location,
    private router:Router) { }
   

  ngOnInit() {
  }

  goBack()
  {
    this.location.back();

  }
}
