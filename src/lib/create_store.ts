import 'firebase/auth';
import 'firebase/firestore'; // <- needed if using firestore
import { History } from 'history';
import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase';
// import { firebaseReducer } from 'react-redux-firebase';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { firestoreReducer, reduxFirestore } from 'redux-firestore';
import { reducer as formReducer } from 'redux-form';
import { combineInteractions } from 'redux-interactions';

import firebaseApp from './firebase';

import * as interactions from '../interactions';

// react-redux-firebase config
const rrfConfig = {
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  userProfile: 'users',
};

export default (history: History, initialState = {}) => {
  const middleware = routerMiddleware(history);

  // Add reactReduxFirebase store enhancer when making store creator
  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebaseApp, rrfConfig), // firebase instance as first argument
  )(compose(reduxFirestore(firebaseApp, {}))(createStore));

  // Add firebase to reducers (uses persistReducer and hardSet)
  const rootReducer = combineReducers({
    ...combineInteractions({
      user: interactions.UserInteraction,
    }),
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    form: formReducer,
    routing: routerReducer,
  });

  return createStoreWithFirebase(
    rootReducer,
    initialState,
    applyMiddleware(middleware),
  );
};
