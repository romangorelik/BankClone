import { Component, OnInit } from '@angular/core';
import firebase from '../helpers/firebase.js'
import { Router } from '@angular/router';

import { SharedPropertiesService } from '../helpers/shared-properties.service'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router, private sharedService: SharedPropertiesService) { }

  ngOnInit() {
    this.sharedService.currentMessage.subscribe(email => this.email = email)
  }

  clearLogEmail() {
    this.sharedService.changeMessage('')
  }

  loginWithEmail() {
    return firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(results => {
        this.sharedService.changeMessage(this.email)
        this.router.navigateByUrl('/home');
        console.log('Logged In')
      })
      .catch(function(error) {
        alert('Wrong email or password')
        console.error(error)
      })
  }

}
