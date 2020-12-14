import firebase from 'firebase';
import '@firebase/firestore';
import { firebaseConfig } from './secrets';

class DataModel {
    constructor() {
        if (firebase.apps.length === 0) { // aka !firebase.apps.length
            firebase.initializeApp(firebaseConfig);
        }
        this.usersRef = firebase.firestore().collection('users');
        this.chatsRef = firebase.firestore().collection('chats');

        this.users = [];
        this.chats = []; // don't need this yet, but we will!
        this.loadUsers();
    }

    loadUsers = async () => {
        let querySnap = await this.usersRef.get();
        querySnap.forEach(qDocSnap => {
            let key = qDocSnap.id;
            let data = qDocSnap.data();
            data.key = key;
            this.users.push(data);
        });
        console.log("Got users:", this.users); // sanity check--remove once it works
    }

    getUsers = () => {
        return this.users;
    }


    createUser = async (email, pass, dispName) => {
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
}

let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }
  return theDataModel;
}