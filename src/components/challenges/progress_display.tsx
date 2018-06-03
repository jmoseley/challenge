import { Quantity } from '@neutrium/quantity';
import * as _ from 'lodash';
import * as React from 'react';

import { Activity } from '../../models/activities';

export interface UserWithActivities extends Meteor.User {
  activities: Activity[];
}

export interface Props {
  goal: number;
  user: UserWithActivities;
}

export default class ChallengeProgressDisplay extends React.Component<Props> {
  public render() {
    const totalMiles = _.reduce(
      this.props.user.activities,
      (sum, a) => {
        return sum + this.convertMetersToMiles(a.distance);
      },
      0,
    );
    let percentage = 0;
    if (totalMiles > 0) {
      percentage = totalMiles / this.props.goal;
    }
    const percentageText = (percentage * 100).toFixed(2);

    return (
      <div>
        {this.props.user.profile.name}: {totalMiles.toFixed(1)} miles -{' '}
        {percentageText}%
      </div>
    );
  }

  private convertMetersToMiles(meters: number): number {
    return new Quantity(meters, 'm').to('mi');
  }
}
