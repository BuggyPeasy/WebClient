// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC9lOcOThaC_7dS3XC6O2KlgmFMTI4EN58',
  authDomain: 'buggpeasy.firebaseapp.com',
  projectId: 'buggpeasy',
  storageBucket: 'buggpeasy.appspot.com',
  messagingSenderId: '505558406106',
  appId: '1:505558406106:web:6b3394a6e0acade66ba6e3',
  measurementId: 'G-DSFY6YM21L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
