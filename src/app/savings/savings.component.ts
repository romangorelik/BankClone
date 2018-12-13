import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import firebase from '../helpers/firebase.js'
import { Router } from '@angular/router';

import { BalanceService } from '../helpers/balance.service';

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

  constructor(private _location: Location, private service: BalanceService, private router: Router) {}

  ngOnInit() {
    this.checkIfUserLoggedIn();
  }

  checkIfUserLoggedIn(): void {
    if (firebase.auth().currentUser === null) {
      this.router.navigateByUrl('/login')
    } else {
      this.email = firebase.auth().currentUser.email;
      this.getSavingsForUser();
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
