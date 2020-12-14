import firebase from 'firebase';
import '@firebase/firestore';
import { firebaseConfig } from './secrets.js';

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

function printInventory() {
  for (let item of appInventory) {
    console.log(item);
  }
}

async function clearInventory() {
  for (let i = 0; i < appInventory.length; i++) {
    let id = appInventory[i].key;
    await invCollRef.doc(id).delete();
  }
  appInventory = [];
}

let addItem = async (data) => {
  let docRef = await invCollRef.add(data);
  data.key = docRef.id;
  appInventory.push(data); // push to app model after FB add
}

async function populateInventory() {
  await addItem({itemName: 'staplers', quantity: 22});
  await addItem({itemName: 'post-its', quantity: 44});
  await addItem({itemName: 'binder clips', quantity: 121});
}

let deleteItem = async (id) => {
  let docRef = invCollRef.doc(id); // get a ref to the doc
  await docRef.delete(); // delete item from Firebase and wait for completion

  // delete from app data model
  let itemIndex = -1; // to store the index of the item to delete
  for (let i in appInventory) {
    if (appInventory[i].key === id) {
      itemIndex = i; // found it!
      break;
    }
  }
  if (itemIndex !== -1) {
    appInventory.splice(itemIndex, 1); // remove the item using the index we found
  }
}

let updateItem = async (id, data) => {
  let docRef = invCollRef.doc(id); // get a ref to the doc
  await docRef.update(data); // update the doc data in Firebase

  let itemIndex = -1; // to store the index of the item to delete
  for (let i in appInventory) {
    if (appInventory[i].key === id) {
      itemIndex = i; // found it!
      break;
    }
  }
  if (itemIndex !== -1) {
    data.key = id; // since we will replace the item, need to insert the key
    appInventory[itemIndex] = data; // replace the item using the found index
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