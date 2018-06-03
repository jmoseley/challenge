import * as dapper from '@convoy/dapper';
import * as React from 'react';

import { User } from '../models/user';
import Button from './button';

// http://www.colourlovers.com/palette/92095/Giant_Goldfish
const STYLES = dapper.compile({
  button: {
    cursor: 'pointer',
    height: '3em',
  },
  container: {
    display: 'flex',
  },
  logout: {
    backgroundColor: '#FA6900',
    borderRadius: '3px',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontFamily: `sans-serif`,
    padding: '7px',
  },
  userName: {
    padding: '5px',
  },
});

export interface Props {
  currentUser: User;
}

export default class LoginButton extends React.Component<Props> {
  public styles: any = dapper.reactTo(this, STYLES);

  public render() {
    if (this.props.currentUser) {
      return (
        <div className={this.styles.container}>
          <div>
            <span className={this.styles.userName}>
              {this.props.currentUser.name}
            </span>
          </div>
          <Button label="Logout" />
        </div>
      );
    } else {
      return (
        <span>
          <img
            className={this.styles.button}
            src="/imgs/btn_strava_connectwith_light.png"
          />
        </span>
      );
    }
  }

  // private logout() {
  //   Meteor.logout();
  // }

  // private login() {
  //   (Meteor as any).loginWithStrava({
  //     requestPermissions: ['public', 'view_private'],
  //   });
  // }
}
