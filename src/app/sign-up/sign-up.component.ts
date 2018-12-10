import { Component, OnInit } from '@angular/core';
import firebase from '../helpers/firebase.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  email: string;
  password: string;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  createWithEmail() {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(response => {
        this.router.navigateByUrl('/home');
        console.log("Created user successfully", response)
      })
      .catch(function(error) {
        alert('Email is already taken')
        console.error(error)
      })
  }

}
