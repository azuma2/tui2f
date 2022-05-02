import firebase from 'firebase'


if (!firebase.apps.length) {
  firebase.initializeApp(
    {
  apiKey: "AIzaSyD7YhgVOWIlTqCU9M82BMK_i1UolV9XSN4",
  authDomain: "tui1-4c273.firebaseapp.com",
  projectId: "tui1-4c273",
  storageBucket: "tui1-4c273.appspot.com",
  messagingSenderId: "856155373546",
  appId: "1:856155373546:web:b4adcede23a06e7085bc93",
  measurementId: "G-0MPP87K7K7"
    }
  )
}
  
export default firebase