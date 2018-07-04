import update from 'immutability-helper';
import { reducer } from 'redux-interactions';

import { User } from '../models';
import RSA from '../oauth_providers/auth_service';
import { stravaProvider } from '../oauth_providers/strava';
import { UserState } from '../state';
import BaseInteraction from './base';

import Log from '../lib/log';

const unauthenticatedState: UserState = {
  isLoggedIn: false,
};

const initialState = { ...unauthenticatedState };

const stravaSession = RSA.restoreSession(stravaProvider);
if (stravaSession) {
  initialState.isLoggedIn = true;
  initialState.services = {
    strava: { accessToken: stravaSession.accessToken },
  };
}

class UserReducer extends BaseInteraction {
  @reducer
  public loginUserWithStrava(
    scopedState: UserState,
    user: User,
    accessToken: string,
  ) {
    return update(scopedState, {
      services: update(scopedState.services || {}, {
        strava: { $set: { accessToken } },
      }),
      user: { $set: user },
    });
  }

  @reducer
  public handleAuthEvent(scopedState: UserState, user: User) {
    Log.info(scopedState);
    Log.info(user);
    return update(scopedState, {
      user: { $set: user },
    });
  }
}

export default new UserReducer();
