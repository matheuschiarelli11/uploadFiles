import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCwkY4zXYNbf5nMo-KACTy-r5GzH4e2p2c",
    authDomain: "vertteste-30d45.firebaseapp.com",
    projectId: "vertteste-30d45",
    storageBucket: "vertteste-30d45.appspot.com",
    messagingSenderId: "1069339271460",
    appId: "1:1069339271460:web:e695b9e4aac3fab74e13b1",
    measurementId: "G-B7CLRC3XFC"
};

const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);
