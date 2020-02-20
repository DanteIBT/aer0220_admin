import { Component } from '@angular/core';
import { Aer0220ApiService } from '../../services/aer0220-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent {

  profile: any = {};

  constructor(private aer0220: Aer0220ApiService, private router: ActivatedRoute) {

    this.router.params.subscribe( params => {

      this.getStudent( params ['id'] );

    });

  }

  getStudent( id: string ){

    this.aer0220.getStudent( id )
    .subscribe ( data => {
      console.log(data);
      this.profile = data;
    });

  }

}
