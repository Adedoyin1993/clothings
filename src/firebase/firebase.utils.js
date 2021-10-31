import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCuIZ9YNXeWzmTnCK7oHCWbSLS6fikzCpk",
  authDomain: "clothing-db-1200e.firebaseapp.com",
  projectId: "clothing-db-1200e",
  storageBucket: "clothing-db-1200e.appspot.com",
  messagingSenderId: "649041948652",
  appId: "1:649041948652:web:ed5fe8abfe61e27fe95ac9",
  measurementId: "G-K5Z4488WQ0"
};
 

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;