import { Component, OnInit } from '@angular/core';
import firebase from '../helpers/firebase.js'
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  loginWithEmail() {
    return firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(results => {
        this.router.navigateByUrl('/home');
        this.email= ''
      })
      .catch(function(error) {
        alert('Wrong email or password')
        console.error(error)
      })
  }

}
