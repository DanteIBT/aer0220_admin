import { Component } from '@angular/core';
import { Aer0220ApiService } from '../../services/aer0220-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})

export class HomeComponent {

  getCourses: any[] = [];
  getCount: any[] = [];
  getTotalAmount: any[] = [];
  getStudentsCourses: any[] = [];
  getAmountCourses: any[] = [];
  getAverageCourses: any[] = [];
  getLastRegistration: any[] = [];
  getStatusCourses: any[] = [];

  getStudentsNew: number ;
  getStudentsRecurrent: any[] = [];
  studentsRecurrent: number;


  constructor(private aer0220: Aer0220ApiService) {

    const courses = 1;

    this.getCoursesService();
    this.getCountService();
    this.getTotalAmountService();
    // Recursive functions
    this.getStudentsCoursesService(courses);
    this.getAmountCoursesService(courses);
    this.getAverageCoursesService(courses);
    this.getLastRegistrationService(courses);
    this.getStudentsNewService(courses);

    this.getStatus(courses);

  }

  public conditionStatus = false;

  getCoursesService() { // List of courses

    this.aer0220.getCourses().then ( ( data: any ) => {
      this.getCourses = data;
    });

  }

  getCountService() { // Total sstudents

    this.aer0220.getCount().then ( ( data: any ) => {
      this.getCount = data;
    });

  }

  getTotalAmountService() { // Total amount

    this.aer0220.getTotalAmount().then ( ( data: any ) => {
      this.getTotalAmount = data;
    });

  }

  private getStudentsNewService(id: any) { // Sum new students

    this.aer0220.getStudentsCourses(id).then ( ( data: any ) => {
      this.getStudentsNew = data;
    });

}

  private getStudentsCoursesService(id: any) { // Total students per course

    const totalCourses = 7;
    if ( id < totalCourses ) {

      this.aer0220.getStudentsCourses(id).then ( ( data: any ) => {
        this.getStudentsCourses.push(data);
        this.getStudentsCoursesService(id + 1);
      });
    }

    // Sum students to the courses > 1
    this.studentsRecurrent = this.getStudentsCourses.reduce((a, b) => a + b, 0);
    this.studentsRecurrent = this.studentsRecurrent - this.getStudentsCourses[0]; // subtract course 1
  }

  private getAmountCoursesService(id: any) { // Total amount per course

    const totalCourses = 7;
    if ( id < totalCourses ) {

      this.aer0220.getAmountCourses(id).then ( ( data: any ) => {
        this.getAmountCourses.push(data);
        this.getAmountCoursesService(id + 1);
      });

    }

  }

  private getAverageCoursesService(id: any) { // Average of age per course

    const totalCourses = 7;
    if ( id < totalCourses ) {

      this.aer0220.getAverageCourses(id).then ( ( data: any ) => {
        this.getAverageCourses.push(data);
        this.getAverageCoursesService(id + 1);
      });

    }

  }

  private getLastRegistrationService(id: any) { // Date of last registration

    const totalCourses = 7;
    if ( id < totalCourses ) {

      this.aer0220.getLastRegistration(id).then ( ( data: any ) => {
        this.getLastRegistration.push(data);
        this.getLastRegistrationService(id + 1);
      });

    }

  }

  getStatus(id: any) { // Status of courses

    const totalCourses = 7;
    let status: string;
    if ( id < totalCourses ) {

      this.aer0220.getStudentsCourses(id).then ( ( data: any ) => {
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

        this.getStatusCourses.push(status);

        this.getStatus(id + 1);

      });
    }


  }


}
