import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../../UserLogin/Service/user-login.service';

@Component({
  selector: 'app-register-options',
  templateUrl: './register-options.component.html',
  styleUrls: ['./register-options.component.css']
})
export class RegisterOptionsComponent implements OnInit {

  constructor(private userservices:UserLoginService) { }

  ngOnInit() {
    //this.bodyText = 'This text can be updated in modal 1';
//   }
//   openModal(id: string) {
//     this.userservices.open(id);
// }

// closeModal(id: string) {
//     this.userservices.close(id);
// }

}
}