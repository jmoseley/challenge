import * as debug from 'debug';

const BASE = 'challenge-app';

class Log {
  public generateMessage(
    level: string,
    message: object | string,
    source?: string,
  ) {
    // Set the prefix which will cause debug to enable the message
    const namespace = `${BASE}:${level}`;
    const log = debug(namespace);

    if (source) {
      log(source, message);
    } else {
      log(message);
    }
  }

  public trace(message: object | string, source?: string) {
    return this.generateMessage('trace', message, source);
  }

  public info(message: object | string, source?: string) {
    return this.generateMessage('info', message, source);
  }

  public warn(message: object | string, source?: string) {
    return this.generateMessage('warn', message, source);
  }

  public error(message: object | string, source?: string) {
    return this.generateMessage('error', message, source);
  }
}

export default new Log();
