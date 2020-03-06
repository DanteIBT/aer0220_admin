import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

  studentsList: any[] = [];

  constructor(private studentService: StudentService , private router: Router) { }

  ngOnInit() {
    this.studentList();
  }

  private studentList() {
    this.studentService.studentList()
    .then ( ( data: any ) => {
      this.studentsList = data;
    });
  }

  public makePayment( studentId: any, index: number ) {

    // Make the payment
    this.studentService.makePayment(studentId).then ( ( data: any ) => {

      this.studentsList[index].status_name = 'Pagado';
                            // payment_status

    }, (err) => {
      console.log(err);

    });

  }

  // Send ID
  public profileStudent( student: any ) {

    let studentId: any;

    studentId = student.student_id;

    this.router.navigate([ '/profile', studentId ]);

  }


}
