import * as React from 'react';
import { Link } from 'react-router-dom';

import Button from './button';

export interface Props {}

export default class ProfileButton extends React.Component<Props> {
  public render() {
    return (
      <Link to="/profile">
        <Button label="Profile" />
      </Link>
    );
  }
}
