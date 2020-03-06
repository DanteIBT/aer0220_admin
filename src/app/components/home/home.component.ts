import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})

export class HomeComponent implements OnInit {

  listOfCourses: any[] = [];
  totalStudentsCourses: any[] = [];
  totalAmountCourses: any[] = [];
  averageCourses: any[] = [];
  lastDateRegistration: any[] = [];
  listStatusCourses: any[] = [];

  totalNewStudents: number = 0 ;
  studentsRecurrent: number = 0;
  totalStudents: number = 0;
  totalAmount: number = 0;
  totalCourses: number = 7;

  public conditionStatus: boolean = false;

  constructor(private studentService: StudentService, private courseService: CourseService) {

  }

  ngOnInit() {

    const courses = 1;

    this.listCourses();
    this.studentsCount();
    this.amountCount();
    this.newStudentsCount(courses);

    // Recursive functions
    this.studentsCoursesCount(courses);
    this.amountCoursesCount(courses);
    this.averageAgeCourses(courses);
    this.lastRegistration(courses);
    this.statusCourses(courses);

  }


  private listCourses() { // List of courses

    this.courseService.listCourses().then ( ( data: any ) => {
      this.listOfCourses = data;
    });

  }

  private studentsCount() { // Total students
    this.studentService.totalStudents().then ( ( data: number ) => {
      this.totalStudents = data;

    });

  }

  private amountCount() { // Total amount

    this.courseService.totalAmount().then ( ( data: number ) => {
      this.totalAmount = data;
    });

  }

  private newStudentsCount(id: any) { // Sum new students
    // Only course 1
    this.courseService.totalStudentsCourses(id).then ( ( data: any ) => {
      this.totalNewStudents = data;
    });

}

  private studentsCoursesCount(id: any) { // Total students per course

    if ( id < this.totalCourses ) {

      this.courseService.totalStudentsCourses(id).then ( ( data: any ) => {
        this.totalStudentsCourses.push(data);
        this.studentsCoursesCount(id + 1);
      });
    }

    // Sum students to the courses > lvl 1
    this.studentsRecurrent = this.totalStudentsCourses.reduce((a, b) => a + b, 0);
    this.studentsRecurrent = this.studentsRecurrent - this.totalStudentsCourses[0]; // subtract course 1
  }

  private amountCoursesCount(id: any) { // Total amount per course

    if ( id < this.totalCourses ) {

      this.courseService.totalAmountCourses(id).then ( ( data: any ) => {
        this.totalAmountCourses.push(data);
        this.amountCoursesCount(id + 1);
      });

    }

  }

  private averageAgeCourses(id: any) { // Average of age per course

    if ( id < this.totalCourses ) {

      this.courseService.averageCourses(id).then ( ( data: any ) => {
        this.averageCourses.push(data);
        this.averageAgeCourses(id + 1);
      });

    }

  }

  private lastRegistration(id: any) { // Date of last registration

    if ( id < this.totalCourses ) {

      this.courseService.lastDateRegistration(id).then ( ( data: any ) => {
        this.lastDateRegistration.push(data);
        this.lastRegistration(id + 1);
      });

    }

  }

  private statusCourses(id: any) { // Status of courses

    let status: string;
    if ( id < this.totalCourses ) {

      this.courseService.totalStudentsCourses(id).then ( ( data: any ) => {
        this.conditionStatus = true;

        // change to switch
        if ( data >= 30) {
          status = 'superado';
          this.conditionStatus = false;
        }
        if ( data >= 24 && data < 30) {
          status = 'aceptado';
          this.conditionStatus = true;
        } else {
          status = 'rezagado';
          this.conditionStatus = true;
        }

        this.listStatusCourses.push(status);

        this.statusCourses(id + 1);

      });
    }


  }


}
