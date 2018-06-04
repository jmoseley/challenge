import axios, { AxiosInstance } from 'axios';
import * as _ from 'lodash';
import { User } from '../models';

export interface ApiClient {
  buildStravaOauthUrl(): Promise<string>;
  authorizeStravaUser(
    code: string,
  ): Promise<{ user: User; accessToken: string }>;
}

export class FirebaseApiClient implements ApiClient {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'http://localhost:5000/challenge-206117/us-central1/',
    });
  }

  public async buildStravaOauthUrl(): Promise<string> {
    const result = await this.httpClient.get('/getStravaOauthUrl');

    return _.get(result, 'data.url');
  }

  public async authorizeStravaUser(
    code: string,
  ): Promise<{ user: User; accessToken: string }> {
    const result = await this.httpClient.get(
      `/authorizeStravaUser?code=${code}`,
    );

    return _.get(result, 'data');
  }
}

export default new FirebaseApiClient();
