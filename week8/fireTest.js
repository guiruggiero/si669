import firebase from 'firebase';
import '@firebase/firestore';
import { firebaseConfig } from './secrets.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// let newVal = Math.round(Math.random() * 100);
// db.doc('/values/1234').set({value: newVal});
// console.log("changed value to", newVal);


// Accessing
// let inventoryRef = db.collection('inventory');
// let itemRef = inventoryRef.doc('vQZ2hfMlMs2Rsd90HCKQ');

// let itemRef = db.collection('inventory').doc('vQZ2hfMlMs2Rsd90HCKQ');

// let itemRef = db.doc('/inventory/vQZ2hfMlMs2Rsd90HCKQ'); // use path from root


// Updating
// let itemRef = db.collection('inventory').doc('vQZ2hfMlMs2Rsd90HCKQ');
// itemRef.update({quantity: 66});

// itemRef.set({itemName: 'stapler removers', quantity: 4}); // overwrites the entire document


// Deleting
// let itemRef = db.collection('inventory').doc('vQZ2hfMlMs2Rsd90HCKQ');
// itemRef.delete();


// Creating
// let itemRef = db.collection('inventory').doc('newID12345678');
// itemRef.set({itemName: 'legal pads', quantity: 38});

// let inventoryRef = db.collection('inventory');
// inventoryRef.add({itemName: 'scotch tape', quantity: 13}); // auto creates an ID

async function addItem(name, qty) { // retrieve the ID that Firebase created
    let inventoryRef = db.collection('inventory');
    let docRef = await inventoryRef.add({
        itemName: name,
        quantity: qty
    });
    console.log(docRef.id);
}
addItem('sharpies', 11);


// Getting contents
// async function getItemAsync(id) {
//     let inventoryRef = db.collection('inventory');
//     let ret = await inventoryRef.doc(id).get();
//     console.log(ret.data());
//     return ret;
// }
// getItemAsync('qjRf9KHj0HG9MJNuyUb8');