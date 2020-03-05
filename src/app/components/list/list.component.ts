import { Component } from '@angular/core';
import { Aer0220ApiService } from '../../services/aer0220-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent {

  studentsList: any[] = [];
  getStatusCourses: any[] = [];

  constructor(private aer0220: Aer0220ApiService, private router: Router) {

    this.getStudents();

  }

  getStudents() {
    this.aer0220.getStudents()
    .then ( ( data: any ) => {
      this.studentsList = data;
    });
  }


  payment( studentId: any, index: number ) {

    // paid
    this.aer0220.putPayment(studentId).then ( ( data: any ) => {

      this.studentsList[index].payment_status = 'Pagado';

    }, (err) => {
      console.log(err);

    });

  }


  // Send ID
  profileStudent( student: any ) {

    let studentId: any;

    studentId = student.student_id;

    this.router.navigate([ '/profile', studentId ]);

  }


}
