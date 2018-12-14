import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import firebase from '../helpers/firebase.js'
import { Router } from '@angular/router';

import { BalanceService } from '../helpers/balance.service';

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.css']
})
export class CheckingComponent implements OnInit {
  email: string;
  otherEmail: string;
  checking: number;
  deposit: number;
  payBills: number;
  transfer: number;

  constructor(private _location: Location, private service: BalanceService, private router: Router) {}

  ngOnInit() {
    this.checkIfUserLoggedIn();
  }

  checkIfUserLoggedIn(): void {
    if (firebase.auth().currentUser === null) {
      this.router.navigateByUrl('/login')
    } else {
      this.email = firebase.auth().currentUser.email;
      this.getCheckingForUser();
    }
  }

  getCheckingForUser(): void {
    this.service.getChecking(this.email).subscribe(checking => {
      this.checking = checking.checking
    })
  }

  depositToAccount(): void {
    if (this.deposit > 0) {
      this.service.addCheckingDeposit(this.email, this.deposit).subscribe(() => this.getCheckingForUser())
    }
    this.deposit = null;
  }

  subtractFromAccount(): void {
    if (this.checking > this.payBills) {
      if (this.payBills > 0) {
        this.service.payBillsChecking(this.email, this.payBills, this.otherEmail).subscribe(() => this.getCheckingForUser())
      }
    } else {
      alert("Not enough balance in your checking account!")
    }
    this.payBills = null;
    this.otherEmail = '';
  }

  transferToSavings(): void {
    if (this.checking >= this.transfer) {
      if (this.transfer > 0) {
        this.service.transferFromChecking(this.email, this.transfer).subscribe(() => this.getCheckingForUser())
      }
    } else {
      alert("Not enough balance in your checking account!")
    }
    this.transfer = null;
  }

  backClicked(): void {
    this._location.back();
  }

}
