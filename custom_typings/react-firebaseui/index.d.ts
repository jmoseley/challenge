declare module 'react-firebaseui' {
  import { Component } from 'react';
  import * as firebase from 'firebase';

  export class StyledFirebaseAuth extends Component<{
    uiConfig: any;
    firebaseAuth: firebase.auth.Auth;
  }> {}
}
