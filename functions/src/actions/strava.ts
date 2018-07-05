import Axios from 'axios';
import * as _ from 'lodash';
import * as strava from '../lib/strava/api';

const CLIENT_ID = '22336';
const CLIENT_SECRET = '581bf5ea9fb479b30f4a06a500b1edcb2ffa67e1';

const STRAVA_AUTH_URL = 'https://www.strava.com/oauth/token';

class StravaActions {
  public async getAccessToken(code: string): Promise<string> {
    const result = await Axios.post(STRAVA_AUTH_URL, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    });

    return _.get(result.data, 'access_token');
  }
}

export default new StravaActions();
