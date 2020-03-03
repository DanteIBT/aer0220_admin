import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper-img',
  templateUrl: './wrapper-img.component.html',
  styles: []
})
export class WrapperImgComponent implements OnInit {


  userName = localStorage.getItem('name');

  constructor() {}

  ngOnInit() {
  }

}
