import { firebase } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCimgsAEDaQQtUmOSeeSBsfHKUIYSG2kZ4",
  authDomain: "doan3-19fd8.firebaseapp.com",
  databaseURL: "https://doan3-19fd8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "doan3-19fd8",
  storageBucket: "doan3-19fd8.appspot.com",
  messagingSenderId: "972709463386",
  appId: "1:972709463386:web:958e3219e2760e3e071f63",
  measurementId: "G-ZJ7EE1T9YQ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
