import * as dapper from '@convoy/dapper';
import * as React from 'react';
import Headroom from 'react-headroom';

import { Link } from 'react-router-dom';
import LoginButton from '../components/login_button';
import ProfileButton from '../components/profile_button';
import { User } from '../models/user';
import Button from './button';

const STYLES = dapper.compile({
  buttons: {
    display: 'flex',
  },
  header: {
    fontFamily: `'Lobster', sans-serif`,
    margin: 0,
    paddingBottom: '0.1em',
  },
  menuWrapper: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid lightgrey',
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '1em',
    paddingRight: '1em',
  },
});

export interface Props {
  currentUser: User;
  profileButton?: boolean;
  homeButton?: boolean;
}

export default class NavBar extends React.Component<Props> {
  // TODO: Fix the types.
  public styles: any = dapper.reactTo(this, STYLES);

  public render() {
    return (
      <Headroom>
        <div className={this.styles.menuWrapper}>
          <h1 className={this.styles.header}>Challenge</h1>
          <div className={this.styles.buttons}>
            {this.props.currentUser &&
              this.props.profileButton && <ProfileButton />}
            {this.props.homeButton && (
              <Link to="/">
                <Button label="Home" />
              </Link>
            )}
            <LoginButton currentUser={this.props.currentUser} />
          </div>
        </div>
      </Headroom>
    );
  }
}
