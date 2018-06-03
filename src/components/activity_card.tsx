import * as dapper from '@convoy/dapper';
import { Quantity } from '@neutrium/quantity';
import { Duration } from 'luxon';
import * as React from 'react';

import { Activity } from '..//models/activities';

const STYLES = dapper.compile({
  activity: {
    margin: '0.5em',
  },
  link: {
    color: 'black',
  },
  title: {
    margin: 0,
  },
});

export interface Props {
  activity: Activity;
}

export default class ActivityCard extends React.Component<Props> {
  public styles: any = dapper.reactTo(this, STYLES);

  public render() {
    const distance: Quantity = new Quantity(
      `${this.props.activity.distance} m`,
    );
    const miles = distance.to('mi').scalar.toFixed(2);

    const duration = Duration.fromObject({
      seconds: this.props.activity.movingTime,
    });

    return (
      <div className={this.styles.activity}>
        <h3 className={this.styles.title}>
          <a
            target="_blank"
            className={this.styles.link}
            href={`https://www.strava.com/activities/${
              this.props.activity.providerId
            }`}
          >
            {this.props.activity.name}
          </a>
        </h3>
        Miles: <span>{miles}</span>
        <br />
        Moving Time:{' '}
        <span>{`${duration.get('hours')}:${duration.get(
          'minutes',
        )}:${duration.get('seconds')}`}</span>
      </div>
    );
  }
}
