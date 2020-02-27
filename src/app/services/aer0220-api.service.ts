import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Aer0220ApiService {

  userToken: string;

  constructor(private http: HttpClient) {
    this.reedToken();
  }

  getQuery( query: string) {
    const url = `http://localhost/aer0220_api/${ query }`;

    const headers = new HttpHeaders({
      Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODE2NDA5NjUsImV4cCI6MTU4MjkzNjk2NSwic3ViIjpudWxsfQ.hOG_Dh1vso3YWPaNpq8vmasZnu-LJuIbrvIWedXz910'
    });

    return this.http.get( url, { headers } ).toPromise();

  }

  getStudents() {

    return this.getQuery('students'); // .pipe( map( data => data ));

  }

  getStudent( id: string ) {

    return this.getQuery(`students/${ id }`);

  }

  getCount() {// Total students enrolled

    return this.getQuery(`count/students`);

  }

  getStudentsCourses( id: any ) {// Total students in course

    return this.getQuery(`count/courses/${ id }`);

  }
  getTotalAmount() {// Total amount

    return this.getQuery(`count/amount`);

  }
  getAmountCourses( id: any ) {// Total amount per course

    return this.getQuery(`count/amount/${ id }`);

  }
  getAverageCourses( id: any ) {// Average of age

    return this.getQuery(`count/age/${ id }`);

  }

  getLastRegistration( id: any ) {// Average of age

    return this.getQuery(`count/registration/${ id }`);

  }

  getCourses() { // List of courses

    return this.http.get('http://localhost/aer0220_api/catalogues/courses').toPromise();

  }


  getLogin(email: string, password: string) {

    return this.http.post('http://localhost/aer0220_api/sign-in', { email, password })
      .pipe( map( data => {
        this.saveToken(data['access_token']);
        return data;
      })
    ).toPromise();

  }

  private saveToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    // Valid expiration date
    const today = new Date();
    today.setSeconds(1296000);

    localStorage.setItem('expires', today.getTime().toString() );

  }

  reedToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }

  setUser(user) {

    const userString = JSON.stringify(user);
    localStorage.setItem('currentUser', userString);

  }

  getCurrentUser() {

  }

  logOut() {

    localStorage.removeItem('token');

  }

  isLogIn(): boolean { // Check the session

    if (this.userToken.length < 2) {
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
