import * as React from 'react';

import { Challenge, ChallengeInvite, User } from '../models';
import ChallengeCard from './challenge_card';

export interface Props {
  currentUser: User;
  challenge: Challenge;
  challengeInvite: ChallengeInvite;
}

export default class AcceptChallengeCard extends React.Component<Props> {
  public render() {
    return (
      <div>
        <ChallengeCard
          currentUser={this.props.currentUser}
          challenge={this.props.challenge}
        />
        <button onClick={this.acceptChallenge}>Accept Challenge</button>
      </div>
    );
  }

  private acceptChallenge = () => {
    // Meteor.call('challenge.accept', {
    //   challengeInviteId: this.props.challengeInvite._id,
    // });
  };
}
