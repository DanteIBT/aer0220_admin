import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Aer0220ApiService {

  userToken: string = '';
  userName: string = '';
  userEmail: string = '';

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.reedToken();
    this.reedUserName();
    this.reedUserEmail();

    // const token = localStorage.getItem('token');

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    });

  }

  public setHeaders(token) {

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token
    });

  }


  getQuery( query: string) {
    const url = `${environment.apiUrl}/${ query }`;

    return this.http.get( url, { headers: this.headers } ).toPromise();

  }

  putQuery( query: string) {
    const url = `${environment.apiUrl}/${ query }`;

    return this.http.put( url, {withCredentials: true}, { headers: this.headers } ).toPromise();

  }

  getStudents() {  // All students

    return this.getQuery('students/');

  }

  getStudent( id: string ) { // One student

    return this.getQuery(`students/${ id }`);

  }

  totalStudents() {// Total students enrolled

    const url = `${environment.apiUrl}/students/count/`;
    return this.http.get( url, { headers: this.headers } ).toPromise();

  }

  totalStudentsCourses( id: any ) {// Total students in course

    return this.getQuery(`students/courses/${ id }`);

  }
  totalAmount() {// Total amount

    return this.getQuery(`payments/amount/`);

  }
  totalAmountCourses( id: any ) {// Total amount per course

    return this.getQuery(`students/amount/${ id }`);

  }
  averageCourses( id: any ) {// Average of age

    return this.getQuery(`students/age/${ id }`);

  }

  lastDateRegistration( id: any ) {// Last Registration

    return this.getQuery(`students/registration/${ id }`);

  }

  getPayments() {// All payments

    return this.getQuery(`payments/`);

  }

  listCourses() { // List of courses

    return this.http.get(`${environment.apiUrl}/catalogues/courses`).toPromise();

  }

  putPayment(studentID: any) {

    return this.putQuery(`payments/${ studentID }`);

    // return this.http.put(`http://localhost/aer0220_api/payments/${ studentID }`, {withCredentials: true}, { headers: this.headers } ).toPromise();

  }

  getLogin(email: string, password: string) {

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

  private saveUserName( userName: string ) {

    this.userName = userName;
    localStorage.setItem('name', userName);

  }

  reedToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }

  reedUserName() {

    if (localStorage.getItem('name')) {
      this.userName = localStorage.getItem('name');
    } else {
      this.userName = '';
    }

    return this.userName;

  }

  reedUserEmail() {

    if (localStorage.getItem('email')) {
      this.userEmail = localStorage.getItem('email');
    } else {
      this.userEmail = '';
    }

    return this.userEmail;

  }

  logOut() {

    localStorage.removeItem('token');
    localStorage.removeItem('name');

  }

  isLogIn(): boolean { // Check the session

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
