import { Component, OnInit } from '@angular/core';
import firebase from '../helpers/firebase.js';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  email: string;
  password: string;


  constructor() { }

  ngOnInit() {
  }

  createWithEmail() {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(response => {
        console.log("Created user successfully", response)
        return response.user.uid
      })
      .catch(function(error) {
        alert('Email is already taken')
        console.error(error)
      })
  }

}
