import * as dapper from '@convoy/dapper';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import * as React from 'react';

import { Challenge } from '../models/challenges';
import ProgressDisplay, {
  UserWithActivities,
} from './challenges/progress_display';
import InviteToChallengeForm from './invite_to_challenge_form';

const STYLES = dapper.compile({
  challenge: {
    margin: '0.5em',
  },
  link: {
    color: 'black',
  },
  small: {
    fontSize: '0.8em',
    paddingRight: '5px',
  },
  title: {
    margin: 0,
  },
});

export interface ChallengeWithUsersAndActivities extends Challenge {
  users?: UserWithActivities[];
}

export interface Props {
  challenge: ChallengeWithUsersAndActivities;
}

export interface State {
  showInviteForm: boolean;
}

export default class ChallengeCard extends React.Component<Props, State> {
  public styles: any = dapper.reactTo(this, STYLES);

  constructor(props: Props) {
    super(props);

    this.state = {
      showInviteForm: false,
    };
  }

  public render() {
    return (
      <div className={this.styles.challenge}>
        <h3 className={this.styles.title}>{this.props.challenge.name}</h3>
        <span>{this.props.challenge.distanceMiles} miles</span>
        {this.props.challenge.creatorId === Meteor.userId() &&
          this.renderOptions()}
        {this.renderParticipants()}
      </div>
    );
  }

  private renderOptions() {
    return (
      <div>
        {this.state.showInviteForm && (
          <InviteToChallengeForm
            form={`inviteToChallenge-${this.props.challenge._id}`}
            challengeId={this.props.challenge._id}
            onSubmit={this.hideInviteForm}
          />
        )}
        {!this.state.showInviteForm && (
          <a
            href={`#invite-${this.props.challenge._id}`}
            className={this.styles.small}
            onClick={this.showInviteForm}
          >
            Invite
          </a>
        )}
        {!this.state.showInviteForm && (
          <a
            href={`#delete-${this.props.challenge._id}`}
            className={this.styles.small}
            onClick={this.deleteChallenge}
          >
            Delete
          </a>
        )}
      </div>
    );
  }

  private showInviteForm = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    this.setState({ showInviteForm: true });
  };

  private hideInviteForm = () => {
    this.setState({ showInviteForm: false });
  };

  private deleteChallenge = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (confirm(`Are you sure you want to delete this challenge?`)) {
      Meteor.call('challenge.delete', {
        challengeId: this.props.challenge._id,
      });
    }
  };

  private renderParticipants = () => {
    const progressDisplays = [];

    for (const user of _.get(
      this.props,
      'challenge.users',
      [],
    ) as UserWithActivities[]) {
      // Weeks start on Monday.
      let currentWeekStart = DateTime.local()
        .set({ day: 1 })
        .startOf('day');

      // Check if its sunday, and backup a week if so.
      if (currentWeekStart > DateTime.local()) {
        currentWeekStart = currentWeekStart.minus({ weeks: 1 });
      }
      // Filter activities to just the most recent week.
      // Eventually we can display past progress.
      const activities = _.filter(user.activities, a => {
        return (
          DateTime.fromISO(a.startDate) > currentWeekStart &&
          DateTime.fromISO(a.startDate) < currentWeekStart.plus({ weeks: 1 })
        );
      });
      progressDisplays.push(
        <ProgressDisplay
          user={{
            ...user,
            activities,
          }}
          key={user._id}
          goal={this.props.challenge.distanceMiles}
        />,
      );
    }

    return (
      <div className={this.styles.participants}>
        {/* Just render the current week for now */}
        {progressDisplays}
      </div>
    );
  };
}
