import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { BalanceService } from '../helpers/balance.service';
import { SharedPropertiesService } from '../helpers/shared-properties.service'

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.css']
})
export class CheckingComponent implements OnInit {
  email: string;
  checking: number;
  deposit: number;
  payBills: number;
  transfer: number;

  constructor(private _location: Location, private service: BalanceService, private sharedService: SharedPropertiesService) {}

  ngOnInit() {
    this.checkWhichEmail();
    this.getCheckingForUser();
  }

  checkWhichEmail() {
    let x;
    let y;

    this.sharedService.currentMessage.subscribe(sharedEmail => x = sharedEmail)
    this.sharedService.regMessage.subscribe(sharedEmail => y = sharedEmail)

    if (x.length > y.length) {
      this.email = x
    } else if (x.length < y.length) {
      this.email = y
    } else {
      this.email = x
    }
  }

  getCheckingForUser(): void {
    this.service.getChecking(this.email).subscribe(checking => {
      this.checking = checking.checking
    })
  }

  backClicked() {
    this._location.back();
  }

}
