import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  exit() {

    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');

  }
}
