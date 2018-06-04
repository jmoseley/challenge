import { User } from '../models';

export interface GlobalState {
  user: UserState;
}

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
  services?: {
    strava?: {
      accessToken: string;
    };
  };
}
