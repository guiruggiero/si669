import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './secrets';

class DataModel {
    constructor() {
        // connect to firebase and get refs
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.currentImageRef = firebase.firestore().doc('images/currentImage');
        this.storageRef = firebase.storage().ref();
        
        this.theImage = undefined; // the one and only image in the app
        this.theCallback = undefined; // a callback so that MainScreen can be notified

        this.loadImage();
    }

    // this will allow the MainScreen to be notified when a new image is ready
    subscribeToImageUpdate = (callback) => {
        this.theCallback = callback;
    }

    // this will allow the CameraScreen to update the image
    updateImage = async (imageObject) => {
        //imageObject format: {uri: xxx, width: yyy, height: zzz}
        this.theImage = imageObject;

        // invoke the callback right away, OK if the storage takes a bit longer
        if (this.theCallback) {
            this.theCallback(imageObject);
        }
        
        // Set up storage ref and file name
        let fileName = '' + Date.now();
        let imageRef = this.storageRef.child(fileName);

        // fetch the image object from the local filesystem
        let response = await fetch(imageObject.uri);
        let imageBlob = await response.blob();

        // then upload it to Firebase Storage
        await imageRef.put(imageBlob);

        // ... and update the current image Document in Firestore
        let downloadURL = await imageRef.getDownloadURL();

        // create a DIFFERENT object to shove into Firebase
        let fbImageObject = {
            height: imageObject.height,
            width: imageObject.width,
            uri: downloadURL
        }
        await this.currentImageRef.set(fbImageObject);
    }

    loadImage = async () => {
        let imageDocSnap = await this.currentImageRef.get();
        this.theImage = imageDocSnap.data();
        console.log("Got image info", this.theImage);

        // since MainScreen.constructor() will run before DataModel.constructor()
        // we expect theCallback to have been set by now
        if (this.theCallback) {
            this.theCallback(this.theImage);
        }
    }
}

// the singleton pattern, same as before
let theDataModel = undefined;

export function getDataModel() {
    if (!theDataModel) {
        theDataModel = new DataModel();
    }

    return theDataModel;
}