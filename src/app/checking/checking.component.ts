import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.css']
})
export class CheckingComponent implements OnInit {

  constructor(private _location: Location) 
  {}

  backClicked() {
    this._location.back();
  }

  ngOnInit() {
  }

}
