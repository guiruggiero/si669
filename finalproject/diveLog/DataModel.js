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

  loadDives = async () => {
    let querySnap = await this.divesRef.get();
    querySnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let data = qDocSnap.data();
      data.key = key;
      this.dives.push(data);
    });
  }

  getUsers = () => {
    return this.users;
  }

  getDives = (userKey) => {
    // let divesFromUser = [];
    // for (let dive of this.dives) {
    //   if (dive.diver === userKey) {
    //     divesFromUser.push(dive);
    //   }
    // }
    // return divesFromUser;

    return this.dives.where('diver', 'equals', userKey);
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
      // all fields
    }

    // add the data to Firebase (dives collection)
    let newDiveDocRef = await this.divesRef.add(newDive);

    // get the new Firebase ID and save it as the local "key"
    let key = newDiveDocRef.id;
    newDive.key = key;
    this.dives.push(newDive);

    return newDive;
  }

  editDive = async (dive) => { // FLAG


    // updates FB
    let docRef = listCollRef.doc(itemKey);
    await docRef.update({text: itemText});

    // updates app data model
    appList = this.state.diveList;
    let foundIndex = -1;
    for (let idx in appList) {
      if (appList[idx].key === itemKey) {
        foundIndex = idx;
        break;
      }
    }
    if (foundIndex !== -1) { // silently fail if item not found
      appList[foundIndex].text = itemText;
    }
    this.setState({diveList: appList});
  }

  deleteDive = async (diveKey) => {
    // deletes from FB
    let docRef = divesRef.doc(diveKey);
    await docRef.delete();

    // deletes from app data model
    let foundIndex = -1;
    for (let idx in this.dives) {
      if (this.dives[idx].key === diveKey) {
        foundIndex = idx;
        break;
      }
    }
    if (foundIndex !== -1) { // silently fail if item not found
      this.dives.splice(foundIndex, 1); // remove one element 
    }
  }

  addDivePicture = async (diveKey, pictureObject) => {
    // set up storage ref and file name
    let fileName = diveKey;
    let pictureRef = this.storageRef.child(fileName);

    // fetch the picture object from the local filesystem
    let response = await fetch(pictureObject.uri);
    let pictureBlob = await response.blob();

    // upload it to Firebase Storage
    await pictureRef.put(pictureBlob);

    // get picture URL
    let downloadURL = await pictureRef.getDownloadURL();
    
    // update dive with picture and store in Firebase
    let diveRef = this.divesRef.doc(diveKey);
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