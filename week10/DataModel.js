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
    this.chats = [];
    this.asyncInit();
  }

  asyncInit = async () => {
    await this.loadUsers();
    await this.loadChats();
  }

  loadUsers = async () => {
    let querySnap = await this.usersRef.get();
    querySnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let data = qDocSnap.data();
      data.key = key;
      this.users.push(data);
    }); // FLAG
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

  getOrCreateChat = async (user1, user2) => {
    // look for this chat in the existing data model 'chats' array
    // if it's here, we know it's already in Firebase
    for (let chat of this.chats) {
      // we need to use user keys to look for a match
      // and we need to check for each user in each position
      if (( chat.participants[0].key === user1.key && 
            chat.participants[1].key === user2.key) ||
          ( chat.participants[0].key === user2.key &&
            chat.participants[1].key === user1.key)){
        console.log("Found chat for", user1.email, user2.email);
        return chat; // if found, return it and we're done
      }
    }
  
    // chat not found, gotta create it. 
    console.log("Creating new chat for", user1.email, user2.email);
    // Create an object for the FB doc, just with the contents we need for FB
    let newChatDocData = { participants: [user1.key, user2.key] };
    // add it to firebase
    let newChatDocRef = await this.chatsRef.add({newChatDocData});
  
    // create a local chat object with full-fledged user objects (not just keys)
    let newChat = {
      key: newChatDocRef.id, // use the Firebase ID
      participants: [user1, user2], // note we're using objects, not keys here
      messages: [] // new chat, empty message list
    }
    // add the new chat object to the data model's 'chats'
    this.chats.push(newChat);
  
    // return the fully-constituted chat object to the client (Screen)
    return newChat;
  }
  
  loadChats = async () => {
    // get all of the chat documents from FB
    let querySnap = await this.chatsRef.get();
    console.log('Got querySnap', querySnap);
  
    // go through all of them, and...
    querySnap.forEach(async (qDocSnap) => {
      // create the skeleton of the DataModel chat object
      let thisChat = {
        key: qDocSnap.id,
        participants: [],
        messages: []
      }
  
      // get the data from the FB chat document
      let data = qDocSnap.data();
  
      // use the user IDs from 'participants' to look up the corresponding objects
      for (let userID of data.participants) {
        // get the object for this ID
        let user = this.getUserForID(userID);
        // add the user object to the chat's 'participants' array
        thisChat.participants.push(user);
      }
  
      // obtain a reference to *this* chat's 'messages' collection
      let messageRef = qDocSnap.ref.collection("messages");
  
      // get all of the messages currently in the collection (asynchronously)
      // note that using 'await' here requires that we make the forEach()
      // handler function async. And that's allowed! (See ~25 lines above)
      let messagesQSnap = await messageRef.get();
  
      // go through the snapshots for each message
      messagesQSnap.forEach(qDocSnap => {
        // grab the message data from the snapshot
        let messageData = qDocSnap.data();
  
        // replace the author ID with the actual user object for the author
        messageData.author = this.getUserForID(messageData.author);
  
        // assign the 'key' to the Firebase document's ID
        messageData.key = qDocSnap.id;
  
        // add this message to the chat's messages array
        thisChat.messages.push(messageData);
      });
  
      //now the chat *object* is ready, so add it to the 'chats' array
      this.chats.push(thisChat);
  
      // sanity check
      console.log('Got chats from Firebase:', this.chats);
    });
  }
  
  getUserForID = (id) => {
    for (let user of this.users) {
      if (user.key === id) {
        return user;
      }
    }
    // if we can't find, return undefined 
  }
  
  addChatMessage = async (chatID, message) => {
    // get a ref to this chat's messages collection. 
    // It's OK if it doesn't exist yet
    let messagesRef = this.chatsRef.doc(chatID).collection('messages');
  
    // create an object that contains the right fields for Firebase
    let fbMessageObject = {
      text: message.text,
      timestamp: message.timestamp,
      // insert just the author ID, not the whole author object
      author: message.author.key, 
    }
  
    // add this message to the collection. It'll exist now!
    messagesRef.add(fbMessageObject); // let onSnapshot give us the object
  }
  
  getChatForID = (id) => {
    for (let chat of this.chats) {
      if (chat.key === id) {
        return chat;
      }
    }
    // if we can't find, return undefined 
  }
  
  // clients will call this method and provide the chat object for
  // the chat they want to subscribe to
  subscribeToChat = (chat, notifyOnUpdate) => {
    // The first two give us a CollectionReference to this chat's 'messages' 
    // The last calls 'onSnapshot()' on the CollRef and provides a function
    this.chatsRef.doc(chat.key).collection('messages')
      .orderBy('timestamp').onSnapshot((querySnap) => {
        // we zero out whatever messages were there previously and start over
        chat.messages = [];
  
        // we go through each message Document Snapshot
        querySnap.forEach((qDocSnap) => {
          // build the message JavaScript object from the Firebase data
          let messageObj = qDocSnap.data();
          messageObj.key = qDocSnap.id;
  
          // replace the author ID with the author object
          messageObj.author = this.getUserForID(messageObj.author);
  
          // and add the object to this chat's messages list
          chat.messages.push(messageObj);
        });
    });
    
    // call the callback function. Because the caller has a reference to 'chat'
    // we don't need to pass any arguments.
    notifyOnUpdate();
  }
}

let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }
  return theDataModel;
}