import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Aer0220ApiService } from '../services/aer0220-api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private aer0220: Aer0220ApiService, private router: Router) { }

  canActivate(): boolean {
    if (this.aer0220.isLogIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
