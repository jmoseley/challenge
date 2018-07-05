import * as debug from 'debug';

const BASE = 'challenge-app';

class Log {
  public generateMessage(
    level: string,
    source: string,
    message: Array<object | string | null | undefined>,
  ) {
    // Set the prefix which will cause debug to enable the message
    const namespace = `${BASE}:${level}`;
    const log = debug(namespace);

    if (source) {
      log(source, ...message);
    } else {
      (log as any)(...message);
    }
  }

  public trace(
    source: string,
    ...message: Array<object | string | null | undefined>
  ) {
    return this.generateMessage('trace', source, message);
  }

  public info(
    source: string,
    ...message: Array<object | string | null | undefined>
  ) {
    return this.generateMessage('info', source, message);
  }

  public warn(
    source: string,
    ...message: Array<object | string | null | undefined>
  ) {
    return this.generateMessage('warn', source, message);
  }

  public error(
    source: string,
    ...message: Array<object | string | null | undefined>
  ) {
    return this.generateMessage('error', source, message);
  }
}

export default new Log();
