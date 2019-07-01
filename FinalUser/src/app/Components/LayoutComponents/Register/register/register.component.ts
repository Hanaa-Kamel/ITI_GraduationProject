import { Component, OnInit } from '@angular/core';
import { ApplicantRegister } from '../ViewModelsDriverApplicant/applicant-register';
import { ApplicantRegisterService } from '../applicant-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public Applicant:ApplicantRegister
  public fileToUpload:File=null;
  constructor(private ApplicantReg:ApplicantRegisterService) {
  this.  Applicant=new ApplicantRegister("","",11,"","","","","","","");
   }

  onSubmit()
  {
   this.ApplicantReg.PostApplicant(this.Applicant,this.fileToUpload).subscribe(res=>alert("succed"),err=>alert(err)) ;
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
   // alert(file.item(0));
   // alert(JSON.stringify(file.item(0)));

    //Show image preview
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (event:any) => {
      this.Applicant.CopyLicenseImage = event.target.result;
    }
   
  }
  ngOnInit() {
   
  }

}
