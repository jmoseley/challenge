import * as dapper from '@convoy/dapper';
import * as React from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/nav_bar';
import AccountInfo from '../components/profile/account_info';
import NotificationPreferences from '../components/profile/notification_preferences';
import { User } from '../models/user';

const STYLES = dapper.compile({
  accountInfo: {
    background: '#ffffff',
    borderLeft: '1px solid lightgrey',
    flex: '1',
    height: '100%',
    marginLeft: '1em',
    padding: '0.5em',
  },
  body: {
    fontFamily: `'Roboto', sans-serif`,
    height: '100%',
  },
  heading: {
    fontWeight: 'lighter',
    marginTop: '0.2em',
  },
  main: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
  },
  preferences: {
    flex: '4',
    padding: '0.5em',
  },
});

export interface StateProps {
  loading: boolean;
  currentUser: User;
}

export interface PropParams {}

export interface Props extends StateProps, PropParams {}

class ProfileScene extends React.Component<Props> {
  public styles: any = dapper.reactTo(this, STYLES);

  public render() {
    if (!this.props.currentUser) {
      return <div />;
    }

    return (
      <div className={this.styles.body}>
        <NavBar currentUser={this.props.currentUser} homeButton={true} />
        <div className={this.styles.main}>
          <div className={this.styles.preferences}>
            <NotificationPreferences user={this.props.currentUser} />
          </div>
          <div className={this.styles.accountInfo}>
            <AccountInfo user={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentUser: state.user,
  loading: false,
});

export default connect<StateProps>(mapStateToProps)(ProfileScene);
