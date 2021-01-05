  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/auth';
  import 'firebase/storage';
  
  var firebaseConfig = {
    apiKey: "AIzaSyCFFOl9wG5l-DVcM4mpgx2Y-H_pvU00kiA",
    authDomain: "visit-munich.firebaseapp.com",
    projectId: "visit-munich",
    storageBucket: "visit-munich.appspot.com",
    messagingSenderId: "83909685175",
    appId: "1:83909685175:web:bf84151bcccb734084c232",
    measurementId: "G-CWBFTJ1VBQ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({timestampsInSnapshots: true });
  firebase.storage();

  export default firebase;