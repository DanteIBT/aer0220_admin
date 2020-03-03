import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  date = new Date();
  year = this.date.getFullYear();

  constructor() {}

  ngOnInit() {

  }

}
