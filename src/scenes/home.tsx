import * as dapper from '@convoy/dapper';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Location } from 'history';
import { withFirebase } from 'react-redux-firebase';
import AcceptChallengeCard from '../components/accept_challenge_card';
import ActivityCard from '../components/activity_card';
import ChallengeCard, {
  ChallengeWithUsersAndActivities,
} from '../components/challenge_card';
import CreateChallenge from '../components/create_challenge';
import NavBar from '../components/nav_bar';
// import Log from '../lib/log';
import { Activity, ChallengeInvite, User } from '../models';
import { GlobalState } from '../state';

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'challenge-app:*');
}

const CoverWrapper = styled.div`
  margin: 0;
  padding: 0;
`;

const Cover = styled.img`
  width: 100%;
`;

const STYLES = dapper.compile({
  body: {
    fontFamily: `'Roboto', sans-serif`,
    height: '100%',
  },
  challengeWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  challenges: {
    flex: '4',
    padding: '0.5em',
  },
  heading: {
    fontWeight: 'lighter',
    marginTop: '0.2em',
  },
  homepage: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  recentRides: {
    background: '#ffffff',
    borderLeft: '1px solid lightgrey',
    flex: '1',
    marginLeft: '1em',
    padding: '0.5em',
  },
});

export interface StateProps {
  currentUser?: User;
  loading?: boolean;
  recentRides: Activity[];
  challenges: ChallengeWithUsersAndActivities[];
  challengeInvites: ChallengeInvite[];
}

export interface PropParams {
  location?: Location;
}

export interface Props extends StateProps, PropParams {}

class HomeScene extends React.Component<Props> {
  public styles: any = dapper.reactTo(this, STYLES);

  public render() {
    return (
      <div className={this.styles.body}>
        <NavBar profileButton={true} />
        {this.renderCover()}
        {this.renderUserData()}
      </div>
    );
  }

  private renderUserData = () => {
    if (!this.props.currentUser) {
      return null;
    }

    if (this.props.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className={this.styles.homepage}>
        <div className={this.styles.challenges}>
          <div className={this.styles.challengeWrapper}>
            <div>{this.renderChallenges()}</div>
            <div>
              <CreateChallenge />
              {this.renderChallengeInvites()}
            </div>
          </div>
        </div>
        <div className={this.styles.recentRides}>
          <h2 className={this.styles.heading}>Recent Rides</h2>
          <div>{this.renderRecentRides()}</div>
        </div>
      </div>
    );
  };

  private renderCover = () => {
    if (this.props.currentUser) {
      return null;
    }

    return (
      <CoverWrapper>
        <Cover src="/imgs/cover.jpeg" />
      </CoverWrapper>
    );
  };

  private renderChallenges = () => {
    return (
      <div>
        {this.props.challenges.map(challenge => {
          if (
            !this.props.currentUser ||
            !_.includes(challenge.members, this.props.currentUser.id)
          ) {
            return;
          }

          return (
            <ChallengeCard
              currentUser={this.props.currentUser}
              challenge={challenge}
              key={challenge._id}
            />
          );
        })}
      </div>
    );
  };

  private renderRecentRides = () => {
    return this.props.recentRides.map(activity => {
      return <ActivityCard activity={activity} key={activity._id} />;
    });
  };

  private renderChallengeInvites = () => {
    if (!this.props.challengeInvites.length) {
      return;
    }

    return (
      <div>
        <h3>Invites</h3>
        {_.map(this.props.challengeInvites, ci => {
          const challenge = _.find(
            this.props.challenges,
            c => c._id === ci.challengeId,
          );

          if (!challenge || !this.props.currentUser) {
            // console.error(`Unable to find challenge for challengeInvite`);
            return;
          }

          return (
            <div key={ci._id}>
              <AcceptChallengeCard
                currentUser={this.props.currentUser}
                challenge={challenge}
                challengeInvite={ci}
              />
            </div>
          );
        })}
      </div>
    );
  };
}

const mapStateToProps = (state: GlobalState) => {
  return {
    challengeInvites: [],
    challenges: [],
    currentUser: _.get(state, 'interactions.user.user'),
    loading: !_.get(state, 'firebase.auth.isLoaded', false),
    recentRides: [],
  };
};

export default withFirebase(connect<StateProps>(mapStateToProps)(HomeScene));
