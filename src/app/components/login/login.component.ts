import { Component } from '@angular/core';
import { Aer0220ApiService } from '../../services/aer0220-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  public user: any = {
      email: '',
      password: ''
  };

  constructor(private aer0220: Aer0220ApiService, private router: Router) { }


  public onLogin() {

    this.aer0220.getLogin(this.user.email, this.user.password)
    .then ( ( data: any ) => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err);

    });

  }


}
