import * as functions from 'firebase-functions';
import * as _ from 'lodash';
import { StravaActions } from '../actions';
import * as strava from '../lib/strava';
import createHandler from './base';

const authorizeStravaUser = createHandler(async request => {
  const code = _.get(request.query, 'code');
  if (!code) {
    throw new Error(`Must include code.`);
  }

  const accessToken = await StravaActions.getAccessToken(code);

  // Fetch the user.
  strava.athlete.accessToken = accessToken;
  const response = await strava.athlete.getLoggedInAthlete();
  const athlete = response.body;

  return { ...athlete, accessToken };
});

export default authorizeStravaUser;
