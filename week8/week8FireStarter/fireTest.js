import firebase from 'firebase';
import '@firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAkvw--2ji0X7esbNbPiL7YxIXZv3EGvPQ",
    authDomain: "si669-guiruggiero-listmaker.firebaseapp.com",
    databaseURL: "https://si669-guiruggiero-listmaker.firebaseio.com",
    projectId: "si669-guiruggiero-listmaker",
    storageBucket: "si669-guiruggiero-listmaker.appspot.com",
    messagingSenderId: "15521856710",
    appId: "1:15521856710:web:ae3cc27d650c1623a86bc7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let newVal = Math.round(Math.random() * 100);
firebase.firestore().doc('/values/1234').set({value: newVal});
console.log("changed value to", newVal);