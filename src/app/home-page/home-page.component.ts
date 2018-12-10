import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from '../helpers/firebase.js'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  checkings: number = 0
  savings: number = 0
  total: number = this.checkings + this.savings

  constructor(private router: Router) { }

  ngOnInit() {
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
        this.router.navigateByUrl('/login')
      });
  }

}
