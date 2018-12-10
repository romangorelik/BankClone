import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDeG4b0FsPHtdPjMOu-zVZ8-qPsNIqyhnI",
  authDomain: "bankclone.firebaseapp.com",
  databaseURL: "https://bankclone.firebaseio.com",
  projectId: "bankclone",
  storageBucket: "bankclone.appspot.com",
  messagingSenderId: "650538682193"
};
firebase.initializeApp(config);

export default firebase