import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { BalanceService } from '../helpers/balance.service';
import { SharedPropertiesService } from '../helpers/shared-properties.service'

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css']
})
export class SavingsComponent implements OnInit {
  email: string;
  savings: number;
  deposit: number;
  transfer: number;
  interest: number;

  constructor(private _location: Location, private service: BalanceService, private sharedService: SharedPropertiesService) {}

  ngOnInit() {
    this.checkWhichEmail();
    this.getSavingsForUser();
  }

  checkWhichEmail(): void {
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

  getSavingsForUser(): void {
    this.service.getSavings(this.email).subscribe(savings => {
      this.savings = savings.savings
      this.calculateInterest();
    })
  }

  depositToAccount(): void {
    if (this.deposit > 0) {
      this.service.addSavingsDeposit(this.email, this.deposit).subscribe(() => {
        this.getSavingsForUser();
      })
    }
    this.deposit = null;
  }

  transferToChecking(): void {
    if (this.savings > this.transfer) {
      if (this.transfer > 0) {
        this.service.transferFromSavings(this.email, this.transfer).subscribe(() => this.getSavingsForUser())
      }
    } else {
      alert('Not enough funds in your savings account!')
    }
    this.transfer = null;
  }

  calculateInterest(): void {
    this.interest = Math.ceil(this.savings * 0.03);
  }

  backClicked(): void {
    this._location.back();
  }

}
