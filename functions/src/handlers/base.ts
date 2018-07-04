import * as functions from 'firebase-functions';
import * as _ from 'lodash';
import { validateCors } from '../lib/cors';

const createHandler = (
  handlerFn: (request: functions.Request) => Promise<any>,
) =>
  functions.https.onRequest((request, response) => {
    validateCors(request, response);

    const result = handlerFn(request)
      .then(r => {
        response.contentType('application/json');
        response.status(200).send(r);
      })
      .catch(e => {
        // TODO: Proper error handling.
        response.status(500).send();
      });
  });

export default createHandler;
