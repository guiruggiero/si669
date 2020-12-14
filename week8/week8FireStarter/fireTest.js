import firebase from 'firebase';
import '@firebase/firestore';
import { firebaseConfig } from './secrets.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function update1234() {
  let newVal = Math.round(Math.random() * 100);
  db.doc('/values/1234').set({value: newVal});
  console.log("Changed value to ", newVal);
}

//inventory CRUD
function updateQuantity(id, qty) {
  let inventoryRef = db.collection('inventory');
  let staplers = inventoryRef.doc(id);
  staplers.update({quantity: qty});
}

function addItem(name, qty) {
  let inventoryRef = db.collection('inventory');
  inventoryRef.add({
    itemName: name,
    quantity: qty
  });
}

async function addItemAsync(name, qty) {
  let inventoryRef = db.collection('inventory');
  let docRef = await inventoryRef.add({
    itemName: name,
    quantity: qty
  });
  console.log(docRef.id);
}

function deleteItem(id) {
  let inventoryRef = db.collection('inventory');
  let itemDoc = inventoryRef.doc(id);
  itemDoc.delete();
}

function getItemPromise(id) {
  let inventoryRef = db.collection('inventory');
  inventoryRef.doc(id).get().then((docSnap => {
    console.log('Got data:', docSnap.data());
  }));
}

async function getItemAsync(id) {
  let inventoryRef = db.collection('inventory');
  let docSnap = await inventoryRef.doc(id).get();
  console.log('Got data:', docSnap.data());
}

function getCollectionPromise(collName) {
  let inventoryRef = db.collection(collName);
  inventoryRef.get().then((querySnap) => {
    for (let qDocSnap of querySnap.docs) {
      console.log(qDocSnap.id, ":", qDocSnap.data());
    }  
  });
}

async function getCollectionAsync(collName) {
  let inventoryRef = db.collection(collName);
  let querySnap = await inventoryRef.get();
  for (let qDocSnap of querySnap.docs) {
    console.log(qDocSnap.id, ":", qDocSnap.data());
  }
}

function main() {
  // update1234();
  // updateQuantity('W6646Cq0NfdMBhGfLWhg', 18);
  // addItem('post-its', 24);
  // addItemAsync('notebooks', 7);
  // deleteItem('bg3dU5alMaisOsaJCZ00');
  // getItemAsync('W6646Cq0NfdMBhGfLWhg');
  getCollectionAsync('inventory');
}

main();