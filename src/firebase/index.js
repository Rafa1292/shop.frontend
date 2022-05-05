import {initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB0YjU4yQIs5pVLbmnIWjHPNiaEWTDhGV0",
    authDomain: "shop-8756f.firebaseapp.com",
    projectId: "shop-8756f",
    storageBucket: "shop-8756f.appspot.com",
    messagingSenderId: "80463080256",
    appId: "1:80463080256:web:73b6f68e7907837fa1a8a5",
    measurementId: "G-8KPNNVTE77"
  };

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);