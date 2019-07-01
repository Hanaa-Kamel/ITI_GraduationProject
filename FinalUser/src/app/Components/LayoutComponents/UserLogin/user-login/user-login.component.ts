import { Component, OnInit } from '@angular/core';
import { IDandToken } from '../ViewModels/idand-token';
import { UserLoginService } from '../Service/user-login.service';
import { Router } from '@angular/router';
//import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
name:string;
password:string;

idAndToken:IDandToken
  constructor( private login:UserLoginService,private router:Router/*,private popup:Popup*/) { }
Login()
{
  // alert("login");
  this.login.Login(this.name,this.password).subscribe(res=>{this.idAndToken=res;
  
  if(this.idAndToken.ID!=null &&this.idAndToken.Token!=null)
  {
    localStorage.setItem('ClientID',this.idAndToken.ID);
    localStorage.setItem('ClientToken',this.idAndToken.Token);
    
// alert(JSON.stringify(this.idAndToken));
this.router.navigate(['/ClientContent']);


  }
//   else{
// this.popup.show();
//   }

  })
}
  ngOnInit() {
   

  }

}
