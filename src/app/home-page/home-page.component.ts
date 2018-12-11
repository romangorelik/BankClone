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
    this.getCheckingForUser();
    this.getSavingsForUser();
    this.sharedService.currentMessage.subscribe(sharedEmail => this.email = sharedEmail)
  }

  getCheckingForUser(): void {
    this.service.getChecking().subscribe(checking => {
      this.checkings = checking.checking
      this.total += checking.checking
    })
  }

  getSavingsForUser(): void {
    this.service.getSavings().subscribe(savings => {
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
        this.router.navigateByUrl('/login')
      });
  }

}
