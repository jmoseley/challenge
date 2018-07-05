import { UserInfo } from 'firebase';
import update from 'immutability-helper';
import { reducer } from 'redux-interactions';

import { User } from '../models';
import RSA from '../oauth_providers/auth_service';
import { stravaProvider } from '../oauth_providers/strava';
import { UserState } from '../state';
import BaseInteraction from './base';

const unauthenticatedState: UserState = {
  isLoggedIn: false,
};

const initialState = { ...unauthenticatedState };

const stravaSession = RSA.restoreSession(stravaProvider);
if (stravaSession) {
  initialState.services = {
    strava: { accessToken: stravaSession.accessToken },
  };
}

class UserInteraction extends BaseInteraction {
  constructor() {
    super();
    this.initialState = initialState;
  }

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
  public handleAuthLogoutEvent(scopedState: UserState) {
    return update(scopedState, {
      isLoggedIn: { $set: false },
      user: { $set: undefined },
    });
  }

  @reducer
  public handleAuthLoginEvent(
    scopedState: UserState,
    userInfo: UserInfo,
    userId: string,
  ) {
    const user: User = {
      email: userInfo.email || 'unknown_user@example.com',
      id: userId,
      name: userInfo.displayName || 'Unknown User',
      preferences: {},
    };

    return update(scopedState, {
      isLoggedIn: { $set: true },
      user: { $set: user },
    });
  }
}

export default new UserInteraction();
