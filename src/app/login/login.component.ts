import { Component, OnInit } from '@angular/core';
import firebase from '../helpers/firebase.js'


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  loginWithEmail() {
    return firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(results => {
        console.log('Logged In')
      })
      .catch(function(error) {
        alert('Wrong email or password')
        console.error(error)
      })
  }

}
