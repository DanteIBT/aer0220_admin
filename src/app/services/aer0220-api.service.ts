import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Aer0220ApiService {

  userToken: string;

  constructor(private http: HttpClient) {
    console.log('Aer0220ApiService Listo!!');
    this.reedToken();
  }

  getQuery( query: string) {
    const url = `http://localhost/aer0220_api/${ query }`;

    const headers = new HttpHeaders({
      Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODE2NDA5NjUsImV4cCI6MTU4MjkzNjk2NSwic3ViIjpudWxsfQ.hOG_Dh1vso3YWPaNpq8vmasZnu-LJuIbrvIWedXz910'
    });

    return this.http.get( url, { headers } );

  }

  getStudents() {

    return this.getQuery('students'); // .pipe( map( data => data ));

  }

  getStudent( id: string ) {

    return this.getQuery(`students/${ id }`);

  }

  getLogin(email: string, password: string) {

    return this.http.post('http://localhost/aer0220_api/sign-in', { email, password })
      .pipe( map( data => {
        this.saveToken(data['access_token']);
        return data;
      })
    );

  }

  private saveToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

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
    let userString = localStorage.getItem('currentUser');

  }

  logOut() {

    localStorage.removeItem('token');

  }

  isLogIn(): boolean {

    if (this.userToken.length < 2) {
      return false;
    }

    const expires = Number(localStorage.getItem('expires'));
    const expiresDate = new Date();
    expiresDate.setTime(expires);

    if (expiresDate > new Date() ) {
      return true;
    } else {
      return false;
    }

  }

  // Total de estudiantes inscritos
  // monto total de las inscripciones
  // calcular edad de todos los estudiantes inscritos en un curso / primediar
  // qué es referencia en la lista de alunnos
  // cambiar status de no pagado / pagado
  // cambiar father_name por tutor_name
  // fotografía en la tabla estudiante / users / y para las medallas (courses)
  // hacer el footer component
  // catálogo de status para los cursos
}
