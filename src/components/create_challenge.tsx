import * as dapper from '@convoy/dapper';
import * as React from 'react';

import CreateChallengeForm from './create_challenge_form';

const STYLES = dapper.compile({
  challenge: {
    margin: '0.5em',
  },
  link: {
    color: 'black',
  },
  title: {
    margin: 0,
  },
});

export default class CreateChallenge extends React.Component {
  public styles: any = dapper.reactTo(this, STYLES);

  public render() {
    return (
      <div className={this.styles.challenge}>
        <h3 className={this.styles.title}>Create Challenge</h3>
        <CreateChallengeForm />
      </div>
    );
  }
}
