import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    });

  }

  public listCourses() { // List of courses
    return this.http.get(`${environment.apiUrl}/catalogues/courses`).toPromise();

  }

  public lastDateRegistration( id: any ) {// Last Registration
    const url = `${environment.apiUrl}/students/registration/${ id }`;
    return this.http.get(url, { headers: this.headers }).toPromise();

  }
  public averageCourses( id: any ) {// Average of age
    const url = `${environment.apiUrl}/students/age/${ id }`;
    return this.http.get(url, { headers: this.headers }).toPromise();

  }
  public totalAmount() {// Total amount
    const url = `${environment.apiUrl}/payments/amount/`;
    return this.http.get(url, { headers: this.headers }).toPromise();

  }
  public totalAmountCourses( id: any ) {// Total amount per course
    const url = `${environment.apiUrl}/students/amount/${ id }`;
    return this.http.get(url, { headers: this.headers }).toPromise();

  }
  public totalStudentsCourses( id: any ) {// Total students in course
    const url = `${environment.apiUrl}/students/courses/${ id }`;
    return this.http.get(url, { headers: this.headers }).toPromise();

  }

}
