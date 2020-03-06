import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`.background-aer { background: unset !important }`]
})
export class LoginComponent implements OnInit{

  userData: FormGroup;

  patternEmail: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$'; // Email

  rememberLogin: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    // Call Form Group
    this.createForm();
  }

  // Get Validations
  get invalideEmail() {
    return this.userData.get('email').invalid && this.userData.get('email').touched;
  }
  get invalidPassword() {
    return this.userData.get('password').invalid && this.userData.get('password').touched;
  }

  private  createForm() {

    let email = '';
    if (localStorage.getItem('email')) {
      email = localStorage.getItem('email');
      this.rememberLogin = true;
    }

    this.userData = this.fb.group({
      email   : [email, [Validators.required, Validators.pattern(this.patternEmail)]],
      password: ['', Validators.required],
      rememberLogin: [this.rememberLogin]
    });
  }

  public onLogin() {

    this.rememberLogin = this.userData.value.rememberLogin;

    this.authenticationService.onLogin(this.userData.value.email, this.userData.value.password)
    .then ( ( data: any ) => {

      if (this.rememberLogin) {
        localStorage.setItem('email', this.userData.value.email);
      }
      if (!this.rememberLogin && localStorage.getItem('email')) {
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err);

    });

  }


}
