import firebase from 'firebase';
import '@firebase/firestore';
import { firebaseConfig } from './Secrets.js';

// Initialize Firebase and get references
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const invCollRef = db.collection('inventory');

// Initialize application state
let appInventory = [];

async function getInventory() {
  appInventory = [];
  let qSnap = await invCollRef.get();
  qSnap.forEach(qDocSnap => {
    let key = qDocSnap.id;
    let data = qDocSnap.data();
    data.key = key;
    appInventory.push(data);
  })
}

async function clearInventory() {
  for (let i = 0; i < appInventory.length; i++) {
    let id = appInventory[i].key;
    await invCollRef.doc(id).delete();
  }
  appInventory = [];
}

async function populateInventory() {
  await addItem({itemName: 'staplers', quantity: 22});
  await addItem({itemName: 'post-its', quantity: 44});
  await addItem({itemName: 'binder clips', quantity: 121});
}

let addItem = async (data) => {
  let docRef = await invCollRef.add(data);
  data.key = docRef.id;
  appInventory.push(data); // push to app model after FB add
}

let deleteItem = async (id) => {
  let docRef = invCollRef.doc(id);
  await docRef.delete();
  let itemIndex = -1;
  for (let i in appInventory) {
    if (appInventory[i].key === id) {
      itemIndex = i;
      break;
    }
  }
  if (itemIndex !== -1) {
    appInventory.splice(itemIndex, 1); // push to app model after FB add
  }
}

let updateItem = async (id, data) => {
  let docRef = invCollRef.doc(id);
  await docRef.update(data);
  let itemIndex = -1;
  for (let i in appInventory) {
    if (appInventory[i].key === id) {
      itemIndex = i;
      break;
    }
  }
  if (itemIndex !== -1) {
    data.key = id;
    appInventory[itemIndex] = data; // push to app model after FB add
  }
}

function printInventory() {
  for (let item of appInventory) {
    console.log(item);
  }
}

async function main() {
  await getInventory();
  console.log("*** AFTER GET INVENTORY ****");
  printInventory();

  await clearInventory();
  console.log("*** AFTER CLEAR INVENTORY ****");
  printInventory();

  await populateInventory();
  console.log("*** AFTER POPULATE INVENTORY ****");
  printInventory();

  await addItem({itemName: 'legal pads', quantity: 11});
  console.log("*** AFTER ADD LEGAL PADS ****");
  printInventory();

  await deleteItem(appInventory[2].key);
  console.log("*** AFTER DELETE ITEM 2 ****");
  printInventory();
  
  let itemToUpdate = appInventory[appInventory.length - 1];
  let updateObject = {
    itemName: itemToUpdate.itemName,
    quantity: 0
  };
  await updateItem(itemToUpdate.key, updateObject);
  console.log("*** AFTER UPDATE LAST ITEM ****");
  printInventory();
}

main();