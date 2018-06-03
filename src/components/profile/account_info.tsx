import * as _ from 'lodash';
import * as React from 'react';
import { User } from '../../models';

export interface Props {
  user: User;
}

export default class AccountInfo extends React.Component<Props> {
  public render() {
    return (
      <div>
        <p>Name: {_.get(this.props.user, 'name')}</p>
        <p>Email: {_.get(this.props.user, 'email')}</p>
      </div>
    );
  }
}
