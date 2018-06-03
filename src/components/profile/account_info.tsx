import * as _ from 'lodash';
import * as React from 'react';

export interface Props {
  user: Meteor.User;
}

export default class AccountInfo extends React.Component<Props> {
  public render() {
    return (
      <div>
        <p>Name: {_.get(this.props.user, 'profile.name')}</p>
        <p>Email: {_.get(this.props.user, 'profile.email')}</p>
      </div>
    );
  }
}
