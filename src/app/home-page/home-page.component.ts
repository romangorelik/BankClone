import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from '../helpers/firebase.js'

import { BalanceService } from '../helpers/balance.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  email: string;
  checkings: number = 0
  savings: number = 0
  total: number = this.checkings + this.savings;
  history: string[];
  historyString: string[] = []
  historyTimes: string[] = []

  constructor(private router: Router, private service: BalanceService) { }

  ngOnInit() {
    this.checkIfUserLoggedIn();
  }

  checkIfUserLoggedIn(): void {
    if (firebase.auth().currentUser === null) {
      this.router.navigateByUrl('/login')
    } else {
      this.email = firebase.auth().currentUser.email;
        this.getCheckingForUser();
        this.getSavingsForUser();
        this.getHistory();
    }
  }

  getCheckingForUser(): void {
    this.service.getChecking(this.email).subscribe(checking => {
      this.checkings = checking.checking
      this.total += checking.checking
    })
  }

  getSavingsForUser(): void {
    this.service.getSavings(this.email).subscribe(savings => {
      this.savings = savings.savings
      this.total += savings.savings
    })
  }

  goToChecking(): void {
    this.router.navigateByUrl('/checking')
  }

  goToSavings(): void {
    this.router.navigateByUrl('/saving')
  }

  getHistory(): void {
    this.service.getAccountHistory(this.email).subscribe(history => {
      this.history = history
      this.getStringAndTime(this.history)
    })
  }

  getStringAndTime(arr: string[]): void {
    for(let i = 0; i < this.history.length; i++) {
      let split = this.history[i].split('!')
      this.historyString.push(split[0])
      this.historyTimes.push(split[1])
    }
  }

  logOut() {
    return firebase
      .auth()
      .signOut()
      .then((response) => {
        this.router.navigateByUrl('/login')
      });
  }

}
