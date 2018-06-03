import * as dapper from '@convoy/dapper';
import * as React from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/nav_bar';
import AccountInfo from '../components/profile/account_info';
import NotificationPreferences from '../components/profile/notification_preferences';

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

export interface DataProps {
  loading: boolean;
  currentUser: Meteor.User;
}

export interface StateProps {
  foo: string;
}

export interface PropParams {}

export interface Props extends DataProps, StateProps, PropParams {}

class ProfileScene extends React.Component<Props> {
  public styles: any = dapper.reactTo(this, STYLES);

  public render() {
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

// POC that the redux connection works.
const mapStateToProps = (state: any) => ({
  foo: 'bar',
});

// function dataLoader(p: PropParams): DataProps {
//   const userDataSub = Meteor.subscribe('userData');
//   return {
//     loading: !userDataSub.ready(),
//     currentUser: Meteor.users.findOne({ _id: Meteor.userId() }),
//   };
// }

export default connect<StateProps>(mapStateToProps)(ProfileScene);
