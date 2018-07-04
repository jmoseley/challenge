import * as querystring from 'querystring';
import createHandler from './base';

const CLIENT_ID = '22336';
const CLIENT_SECRET = '581bf5ea9fb479b30f4a06a500b1edcb2ffa67e1';

const REDIRECT_URI = 'http://localhost:3000/redirect.html';

const getStravaOauthUrl = createHandler(async request => {
  // https://developers.strava.com/docs/authentication/
  const qs = querystring.stringify({
    approval_prompt: 'auto',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'view_private',
  });

  return { url: `https://www.strava.com/oauth/authorize?${qs}` };
});

export default getStravaOauthUrl;
