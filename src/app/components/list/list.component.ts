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

  constructor(private aer0220: Aer0220ApiService, private router: Router) {

    // this.getPaymentStatus();

    this.aer0220.getStudents()
    .then ( ( data: any ) => {
      this.studentsList = data;
    });

    const conditionStatus = true;
  }

  public conditionStatus = false;

  getPaymentStatus() {


  }


  payment( studentId: any ) {

    console.log(studentId);

    // paid
    this.aer0220.putPayment(studentId).then ( ( data: any ) => {

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
