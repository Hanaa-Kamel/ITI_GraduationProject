import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ResultViewModel } from '../../../shared/view-models/result-view-models';
import { TokenService } from '../../../shared/services/token.service';
import { ApiService } from '../../../shared/services/api.service';
import { LocalizationService } from '../../../shared/services/localization.service';
import { Patterns } from '../../../shared/common/patterns';
import { AlertService } from '../../alert/alert.service';
import { LoginViewModel } from './login.model';
import { UserService } from '../user.service';
import { IDandToken } from 'src/app/ViewModel/idand-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:LoginViewModel;
  isLoading:boolean=false;
  result:ResultViewModel;
  form:FormGroup;
  name:string;
  password:string;
  
  idAndToken:IDandToken;
  constructor(    private userService: UserService,private router:Router,
  
    private alertService: AlertService,private tokenService:TokenService,private apiService:ApiService,private route:Router,
    private formBuilder:FormBuilder,private translate: TranslateService,private localizationService:LocalizationService) {
    // the lang to use, if the lang isn't available, it will use the current loader to get them
   this.translate.use(localizationService.getLanguage());
   }
   ngOnInit() {
    this.model = new LoginViewModel();
     this.createForm();

  }
  // changeLanguage(){}
createForm()
{
  this.form=this.formBuilder.group(
    {
      email:['',[Validators.pattern(Patterns.Email),Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]]
    }
  );
}
login(){
  this.model = Object.assign(this.model,this.form.value);
  this.userService.Login(this.model.email,this.model.password).subscribe(res=>{this.idAndToken=res;
    
    if(this.idAndToken.ID!=null &&this.idAndToken.Token!=null)
    {
      localStorage.setItem('ID',this.idAndToken.ID);
      localStorage.setItem('Token',this.idAndToken.Token);
     this.route.navigateByUrl("/home");
 // this.router.navigate(['/DriverContent']);
  //alert(JSON.stringify(this.idAndToken));
 
    }
    else{

      alert("تأكد من كلمه المرور أو البريد الالكتروني");
    }
    })


  // this.isLoading=true;
  //  this.model = Object.assign(this.model,this.form.value);
  //  this.userService.Login().subscribe(response=>{
  //    this.result = response;
  //    if(response.Success)
  //    {
  //      this.tokenService.setToken(response.Data["AccessToken"]);
  //      this.route.navigateByUrl("/hr/job");
  //     this.route.navigateByUrl("/home");
  //    }
  //  },null,()=>{
   
  //    this.isLoading=false;
  //  });

  
}
 changeLanguage() {
  window.location.reload();
  this.localizationService.setLanguage(this.localizationService.getLanguage() == 'ar' ? 'en' : 'ar');
  this.translate.use(this.localizationService.getLanguage());
} 
 

}
