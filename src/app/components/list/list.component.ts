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

    this.aer0220.getStudents()
    .subscribe ( ( data: any ) => {
      console.log(data);
      this.studentsList = data;
    });

  }

  // Send ID
  profileStudent( student: any ) {

    let studentId;

    studentId = student.student_id;

    console.log(studentId);

    this.router.navigate([ '/profile', studentId ]);

  }


}
