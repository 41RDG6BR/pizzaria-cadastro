import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: 'AIzaSyC97wtrMNKy39CAo88rRpkfUn93_ae3MX8',
    authDomain: 'rosacor-41.firebaseapp.com',
    projectId: 'rosacor-41',
    storageBucket: 'rosacor-41.appspot.com',
    messagingSenderId: '1050363860573',
    appId: '1:1050363860573:web:04709393df240ceee5dfb4',
    measurementId: 'G-J8SJ9YH9E4'
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
    // databaseURL: process.env.REACT_APP_DATABASE_URL,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_APP_ID,
    // measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };
firebase.initializeApp(config)

export const db = firebase.firestore()
export default firebase