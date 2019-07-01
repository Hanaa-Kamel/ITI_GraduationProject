import { Component, OnInit } from '@angular/core';
import { LogInService } from '../Services/log-in.service';
import { IDandToken } from '../../UserLogin/ViewModels/idand-token';
import { Routes, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name:string;
  password:string;
  
  idAndToken:IDandToken;
 
  constructor(private LogIn:LogInService,private router:Router) { }


  Login()
  {
    
    this.LogIn.Login(this.name,this.password).subscribe(res=>{this.idAndToken=res;
    
    if(this.idAndToken.ID!=null &&this.idAndToken.Token!=null)
    {
      localStorage.setItem('ID',this.idAndToken.ID);
      localStorage.setItem('Token',this.idAndToken.Token);
     
  this.router.navigate(['/DriverContent']);
 // alert(JSON.stringify(this.idAndToken));
 
    }
    else{

      alert("تأكد من كلمه المرور و البريد الالكتروني");
    }
    })

  }
  ngOnInit() {
  }

}
