import { Component } from '@angular/core';
import { Aer0220ApiService } from 'src/app/services/aer0220-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {

  constructor(private aer0220: Aer0220ApiService, private router: Router) { }

  exit() {

    this.aer0220.logOut();
    this.router.navigateByUrl('/login');

  }
}
