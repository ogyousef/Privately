// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';


// const firebaseConfig = {
//   apiKey: "AIzaSyC50UUObqdSG5nuhrYaZxBrfoU0S9fMTYc",
//   authDomain: "privately-55b7d.firebaseapp.com",
//   projectId: "privately-55b7d",
//   storageBucket: "privately-55b7d.appspot.com",
//   messagingSenderId: "114003895768",
//   appId: "1:114003895768:web:b297e8845a607c5210fead",
//   measurementId: "G-TM4S4FJXXV"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyARv7Ntj3rX5YUCZz8tUfIRTMZyrzHMIO4",
//   authDomain: "promptia-393919.firebaseapp.com",
//   projectId: "promptia-393919",
//   storageBucket: "promptia-393919.appspot.com",
//   messagingSenderId: "766652513979",
//   appId: "1:766652513979:web:26700348652032f562339e",
//   measurementId: "G-W40FRBT0MK"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCDPPIzz9LJcIrHVAilAstISKprYZJTa5A",
  authDomain: "mail-9b590.firebaseapp.com",
  projectId: "mail-9b590",
  storageBucket: "mail-9b590.appspot.com",
  messagingSenderId: "56999690517",
  appId: "1:56999690517:web:aaafab3d16c01fb9b0e91c",
  measurementId: "G-CCJK7N0T6V"
};
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export { db, };
