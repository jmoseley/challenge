import * as corsImport from 'cors';

const cors = corsImport({ origin: true });

export function validateCors(request, response): void {
  cors(request, response, () => {
    return;
  });
}
