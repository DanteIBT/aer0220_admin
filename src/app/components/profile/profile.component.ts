import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent {

  profile: any = {};

  constructor(private studentService: StudentService, private router: ActivatedRoute) {

    this.router.params.subscribe( params => {

      this.studentProfile( params ['id'] );

    });

  }

  studentProfile( id: string ) {

    this.studentService.studentProfile( id )
    .then ( data => {
      this.profile = data;
    });

  }

}
