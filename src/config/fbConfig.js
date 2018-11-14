import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Replace this with your own config details
const config = {
  apiKey: "AIzaSyD6qM-DfZ9LI4hgcP9pz7suyjTpjMhAm9M",
  authDomain: "pari-bakes.firebaseapp.com",
  databaseURL: "https://pari-bakes.firebaseio.com",
  projectId: "pari-bakes",
  storageBucket: "pari-bakes.appspot.com",
  messagingSenderId: "19319283809"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
