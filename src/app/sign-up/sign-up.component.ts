import { Component, OnInit } from '@angular/core';
import firebase from '../helpers/firebase.js';
import { Router } from '@angular/router';

import { BalanceService } from '../helpers/balance.service'
import { SharedPropertiesService } from '../helpers/shared-properties.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  email: string;
  password: string;


  constructor(private router: Router, private balance: BalanceService, private sharedService: SharedPropertiesService) { }

  ngOnInit() {
    this.sharedService.regMessage.subscribe(email => this.email = email)
  }

  clearRegEmail() {
    this.sharedService.changeRegisterMessage('')
  }

  createWithEmail() {
    if (this.password.length >= 6) {
      return firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(response => {
        this.balance.registerUser(this.email).subscribe()
        this.sharedService.changeRegisterMessage(this.email)
        setTimeout(() => {this.router.navigateByUrl('/home')}, 1000)
        console.log("Created user successfully", response)
      })
      .catch(function(error) {
        alert('Email is already taken')
        console.error(error)
      })
    } else {
      alert('Password must be 6 or more characters.')
    }
  }

}
