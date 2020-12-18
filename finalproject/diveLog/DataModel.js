import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './Secrets';

class DataModel {
  constructor() {
    // removes multiple FB initialization error
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    this.usersRef = firebase.firestore().collection('users');
    this.divesRef = firebase.firestore().collection('dives');
    this.storageRef = firebase.storage().ref();

    this.users = [];
    this.dives = [];
    this.asyncInit();
  }

  asyncInit = async () => {
    this.loadUsers();
    this.loadDives();
  }

  loadUsers = async () => {
    let querySnap = await this.usersRef.get();
    querySnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let data = qDocSnap.data();
      data.key = key;
      this.users.push(data);
    });
  }

  loadDives = async () => { // userKey as argument? Where is this (or loadChats) called? FLAG
    let querySnap = await this.divesRef.get();
    querySnap.forEach(qDocSnap => {
      // if qDocSnap.diver === userKey FLAG
      
      console.log(qDocSnap);

      let key = qDocSnap.id;
      console.log(key);

      let data = qDocSnap.data();
      console.log(data);
      console.log(data.key);

      data.key = key;

      this.dives.push(data);
    });
  }

  getUsers = () => {
    return this.users;
  }

  getDives = () => {
    return this.dives;
  }

  addUser = async (email, pass, dispName) => {
    // assemble the data structure
    let newUser = {
      email: email,
      password: pass,
      displayName: dispName
    }

    // add the data to Firebase (user collection)
    let newUserDocRef = await this.usersRef.add(newUser);

    // get the new Firebase ID and save it as the local "key"
    let key = newUserDocRef.id;
    newUser.key = key;
    this.users.push(newUser);

    return newUser;
  }

  addDive = async () => { // add all fields as arguments FLAG
    // assemble the data structure
    let newDive = {
      // all fields FLAG
    }

    // add the data to Firebase (dives collection)
    let newDiveDocRef = await this.divesRef.add(newDive);

    // get the new Firebase ID and save it as the local "key"
    let key = newDiveDocRef.id;
    newDive.key = key;
    this.dives.push(newDive);

    return newDive;
  }

  getUserForID = (id) => {
    for (let user of this.users) {
      if (user.key === id) {
        return user; // will return undefined
      }
    }
  }

  getDiveForID = (id) => {
    for (let dive of this.dives) {
      if (dive.key === id) {
        return dive; // will return undefined
      }
    }
  }

  addDivePicture = async (dive, pictureObject) => {
    // set up storage ref and file name
    let fileName = dive.key;
    let pictureRef = this.storageRef.child(fileName);

    // fetch the picture object from the local filesystem
    let response = await fetch(pictureObject.uri);
    let pictureBlob = await response.blob();

    // upload it to Firebase Storage
    await pictureRef.put(pictureBlob); // replaces too? FLAG

    // get picture URL
    let downloadURL = await pictureRef.getDownloadURL();
    
    // update dive with picture and store in Firebase
    let diveRef = this.divesRef.doc(dive.key);
    await diveRef.update({
      pictureURL: downloadURL,
      pictureHeight: pictureObject.height,
      pictureWidth: pictureObject.width
    });
  }
}


let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }

  return theDataModel;
}