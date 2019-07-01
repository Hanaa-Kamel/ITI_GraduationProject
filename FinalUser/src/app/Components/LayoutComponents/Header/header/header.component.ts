import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { LOADIPHLPAPI } from 'dns';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
ISLogin:boolean=false;
Status:boolean;

  constructor(private router:Router) { }
  

  ngOnInit() {

    if((localStorage.getItem('ClientID')!=null&&localStorage.getItem('ClientToken')!=null)||
    (localStorage.getItem('ID')!=null&&localStorage.getItem('Token')!=null))
    {
      this.ISLogin=true;
      alert(this.ISLogin);

    if(localStorage.getItem('ClientID')!=null&&localStorage.getItem('ClientToken')!=null)
    this.Status=false;//client
    else
    this.Status=true;//Driver
    alert(this.Status);

    }
    // if(localStorage.getItem('ClientID')!=null&&localStorage.getItem('ClientToken'))
    // {
    //   this.router.navigate(['/ClientContent']);
    // }
    // else if(localStorage.getItem('ID')!=null&&localStorage.getItem('Token')!=null)
    // {
    //   this.router.navigate(['/DriverContent']);
    // }

  }
  LogOut()

  {
   // alert('lll');
    this.ISLogin=false;
    //localStorage.setItem('ClientID',null);
   // localStorage.setItem('ClientToken',null);
    // localStorage.setItem('ID',null);
    // localStorage.setItem('Token',null);
    localStorage.clear();
   // alert(localStorage.getItem('ID'))


this.router.navigate(['/home']);

  }


}
