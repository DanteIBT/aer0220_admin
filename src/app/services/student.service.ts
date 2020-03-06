import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    });

   }

  public  totalStudents() {// Total students enrolled

    const url = `${environment.apiUrl}/students/count/`;
    return this.http.get( url, { headers: this.headers } ).toPromise();

  }
  public  studentList() {  // All students
    const url = `${environment.apiUrl}/students/`;
    return this.http.get( url, { headers: this.headers } ).toPromise();

  }
  public studentProfile( id: string ) { // One student
    const url = `${environment.apiUrl}/students/${ id }`;
    return this.http.get( url, { headers: this.headers } ).toPromise();

  }
  public makePayment(studentID: any) {
    const url = `${environment.apiUrl}/payments/${ studentID }`;
    return this.http.put( url, {withCredentials: true}, { headers: this.headers } ).toPromise();

  }

}
