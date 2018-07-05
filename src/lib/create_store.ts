import 'firebase/auth';
import 'firebase/firestore'; // <- needed if using firestore
import { History } from 'history';
import { Store } from 'react-redux';
import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase';
// import { firebaseReducer } from 'react-redux-firebase';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
} from 'redux';
import { firestoreReducer, reduxFirestore } from 'redux-firestore';
import { reducer as formReducer } from 'redux-form';
import { combineInteractions } from 'redux-interactions';

import * as interactions from '../interactions';
import firebaseApp from './firebase';
import Log from './log';

// react-redux-firebase config
const rrfConfig = {
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  userProfile: 'users',
};

export default (history: History, initialState = {}) => {
  const routerMiddlewareInstance = routerMiddleware(history);

  // Add reactReduxFirebase store enhancer when making store creator
  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebaseApp, rrfConfig), // firebase instance as first argument
  )(compose(reduxFirestore(firebaseApp, {}))(createStore));

  const interactionReducers = combineInteractions({
    user: interactions.UserInteraction,
  });

  // Add firebase to reducers (uses persistReducer and hardSet)
  const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    form: formReducer,
    interactions: interactionReducers,
    routing: routerReducer,
  });

  const loggerMiddleware: any = (s: Store<any>) => (next: Middleware) => (
    action: any,
  ) => {
    Log.info(`loggingMiddleware-${action.type}`, 'action', action);
    const result = next(action);
    Log.info(`loggingMiddleware:${action.type}`, 'nextState', s.getState());
    return result;
  };

  const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    applyMiddleware(loggerMiddleware, routerMiddlewareInstance),
  );

  firebaseApp.auth().onAuthStateChanged(user => {
    if (!user || !user.providerData || !user.providerData.length) {
      const handleAuthLogoutEventAction = (interactions.UserInteraction
        .handleAuthLogoutEvent as any)();

      store.dispatch(handleAuthLogoutEventAction);
      return;
    }

    // The action creator exported by the class actually has a different signature than the class... this is
    // the nature of redux-interactions.
    const handleAuthLoginEventAction = (interactions.UserInteraction
      .handleAuthLoginEvent as any)(user.providerData[0], user.uid);

    store.dispatch(handleAuthLoginEventAction);
  });

  return store;
};
