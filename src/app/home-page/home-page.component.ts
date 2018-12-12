import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from '../helpers/firebase.js'

import { BalanceService } from '../helpers/balance.service';
import { SharedPropertiesService } from '../helpers/shared-properties.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  email: string;
  checkings: number = 0
  savings: number = 0
  total: number = this.checkings + this.savings

  constructor(private router: Router, private service: BalanceService, private sharedService: SharedPropertiesService) { }

  ngOnInit() {
    this.checkWhichEmail();
    this.getCheckingForUser();
    this.getSavingsForUser();
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

  logOut() {
    return firebase
      .auth()
      .signOut()
      .then((response) => {
        this.sharedService.changeMessage('')
        this.sharedService.changeRegisterMessage('')
        this.router.navigateByUrl('/login')
      });
  }

}
