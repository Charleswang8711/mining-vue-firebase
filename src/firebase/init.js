// Initialize Firebase
import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3D7VbUeMupV3LMVJ_bxh-oXMKq-kMUFw",
    authDomain: "sms-truckdump-v3.firebaseapp.com",
    databaseURL: "https://sms-truckdump-v3.firebaseio.com",
    projectId: "sms-truckdump-v3",
    storageBucket: "",
    messagingSenderId: "269507498839"
  };
  
  const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore database
export default firebaseApp.firestore()
