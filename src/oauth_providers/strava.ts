import ApiClient from '../lib/api_client';
import { User } from '../models';
import { IProvider } from './auth_service';

export interface Session {
  accessToken: string;
  user: User;
}

export const stravaProvider: IProvider<Session> = {
  buildAuthorizeUrl: async () => {
    return await ApiClient.buildStravaOauthUrl();
  },
  extractError: redirectUrl => {
    const errorMatch = redirectUrl.match(/error=([^&]+)/);
    if (!errorMatch) {
      return undefined;
    }

    const errorReason = errorMatch[1];
    return new Error(`Error during login. Reason: ${errorReason}`);
  },
  extractSession: async redirectUrl => {
    let code: string = null!;
    const codeMatch = redirectUrl.match(/code=([^&]+)/);
    if (codeMatch) {
      code = codeMatch[1];
    }

    return await ApiClient.authorizeStravaUser(code);
  },
  getAccessToken: (session: Session, redirectUrl: string) => {
    return session.accessToken;
  },
  getSignOutUrl: () => '',
  validateSession: () => true,
};
