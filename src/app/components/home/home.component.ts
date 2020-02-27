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

  }

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

  private getStudentsCoursesService(id: any) { // Total students per course

    const totalCourses = 7;
    if ( id < totalCourses ) {

      this.aer0220.getStudentsCourses(id).then ( ( data: any ) => {
        this.getStudentsCourses.push(data);
        this.getStudentsCoursesService(id + 1);
      });
    }

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

}

