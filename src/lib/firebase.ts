import * as firebase from 'firebase';
import { UserInteraction } from '../interactions';

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyB59maSTFgKsxvmazKfWtqvXpZj3i9fOu0',
  authDomain: 'challenge-206117.firebaseapp.com',
  databaseURL: 'https://challenge-206117.firebaseio.com',
  messagingSenderId: '281618296611',
  projectId: 'challenge-206117',
  storageBucket: 'challenge-206117.appspot.com',
};
const app = firebase.initializeApp(config);

const settings = { /* your settings... */ timestampsInSnapshots: true };
// Initialize other services on firebase instance
const firestore = app.firestore(); // <- needed if using firestore
firestore.settings(settings);

app
  .auth()
  .onAuthStateChanged(user => (UserInteraction.handleAuthEvent as any)(user));

export default app;
