import * as dapper from '@convoy/dapper';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { UserInteraction } from '../interactions';
import { User } from '../models/user';
import RSA from '../oauth_providers/auth_service';
import { stravaProvider } from '../oauth_providers/strava';
import { GlobalState } from '../state';
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

export interface StateProps {
  currentUser?: User;
  doLogin: (user: User, accessToken: string) => Promise<void>;
}

export interface Props extends StateProps {}

class StravaLoginButton extends React.Component<Props> {
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
        <span onClick={this.onClickLogin}>
          <img
            className={this.styles.button}
            src="/imgs/btn_strava_connectwith_light.png"
          />
        </span>
      );
    }
  }

  private onClickLogin = async (event: any) => {
    event.preventDefault();

    const session = await RSA.acquireTokenAsync(stravaProvider);
    this.props.doLogin(session.user, session.accessToken);
  };
}

const mapStateToProps = (state: GlobalState) => {
  return {
    currentUser: _.get(state, 'user.user'),
    // https://github.com/Microsoft/TypeScript/issues/4881
    doLogin: UserInteraction.loginUserWithStrava as any,
  };
};

export default connect(mapStateToProps)(StravaLoginButton);
