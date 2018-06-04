import * as dapper from '@convoy/dapper';
import * as _ from 'lodash';
import * as React from 'react';
import Headroom from 'react-headroom';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginButton from '../components/login_button';
import ProfileButton from '../components/profile_button';
import { User } from '../models/user';
import { GlobalState } from '../state';
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

export interface StateProps {
  currentUser?: User;
}

export interface Props extends StateProps {
  profileButton?: boolean;
  homeButton?: boolean;
}

class NavBar extends React.Component<Props> {
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
            <LoginButton />
          </div>
        </div>
      </Headroom>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    currentUser: _.get(state, 'user.user'),
  };
};

export default connect(mapStateToProps)(NavBar);
