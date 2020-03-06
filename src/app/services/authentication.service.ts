import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userToken: string = '';
  userName: string = '';
  userEmail: string = '';

  headers: HttpHeaders;

  constructor(private http: HttpClient) {

    this.reedToken();
    this.reedUserName();
    this.reedUserEmail();

  }

  public onLogin(email: string, password: string) {

    return this.http.post(`${environment.apiUrl}/sign-in`, { email, password })
      .pipe( map( data => {
        this.saveToken(data['access_token']);
        this.setHeaders(data['access_token']);
        this.saveUserName(data['user']['name']);

        return data;
      })
    ).toPromise();

  }

  private saveToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    // Valid expiration date
    const today = new Date();
    today.setSeconds(1296000); // 15 days

    localStorage.setItem('expires', today.getTime().toString() );

  }

  private setHeaders(token) {

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token
    });

  }

  private saveUserName( userName: string ) {

    this.userName = userName;
    localStorage.setItem('name', userName);

  }

  private reedToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }

  private reedUserName() {

    if (localStorage.getItem('name')) {
      this.userName = localStorage.getItem('name');
    } else {
      this.userName = '';
    }

    return this.userName;

  }

  private reedUserEmail() {

    if (localStorage.getItem('email')) {
      this.userEmail = localStorage.getItem('email');
    } else {
      this.userEmail = '';
    }

    return this.userEmail;

  }

  public logOut() {

    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('expires');

  }

  public isLogIn(): boolean { // Check the session

    if (this.userToken === '') {
      return false;
    }

    const expires = Number(localStorage.getItem('expires'));
    const expiresDate = new Date();
    expiresDate.setTime(expires);

    // Valid expiration date
    if (expiresDate > new Date() ) {
      return true;
    } else {
      return false;
    }

  }




}
