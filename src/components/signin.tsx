// Import FirebaseAuth and firebase.
import * as firebase from 'firebase';
import * as React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';

// Configure FirebaseUI.
const uiConfig = {
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

class SignInComponent extends React.Component {
  // The component's Local state.
  public state = {
    isSignedIn: false, // Local signed-in state.
  };

  private unregisterAuthObserver: () => void;

  // Listen to the Firebase Auth state and set the local state.
  public componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  public componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  public render() {
    if (!this.state.isSignedIn) {
      return (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      );
    }

    return (
      <div>
        <a href="#" onClick={this.logoutOnClick}>
          Sign-out
        </a>
      </div>
    );
  }

  private logoutOnClick(e: React.MouseEvent<HTMLElement>) {
    firebase.auth().signOut();
    e.preventDefault();
  }
}

export default SignInComponent;
