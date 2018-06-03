import * as React from 'react';

import { ChallengeInvite } from '../models/challenge_invites';
import { Challenge } from '../models/challenges';
import ChallengeCard from './challenge_card';

export interface Props {
  challenge: Challenge;
  challengeInvite: ChallengeInvite;
}

export default class AcceptChallengeCard extends React.Component<Props> {
  public render() {
    return (
      <div>
        <ChallengeCard challenge={this.props.challenge} />
        <button onClick={this.acceptChallenge}>Accept Challenge</button>
      </div>
    );
  }

  private acceptChallenge = () => {
    Meteor.call('challenge.accept', {
      challengeInviteId: this.props.challengeInvite._id,
    });
  };
}
