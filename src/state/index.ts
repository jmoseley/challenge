import { User } from '../models';

export interface GlobalState {
  firebase: any; // :(
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
