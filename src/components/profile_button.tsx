import * as React from 'react';
import { withRouter, WithRouterProps } from 'react-router';

import Button from './button';

export interface Props {}

class ProfileButton extends React.Component<Props & WithRouterProps> {
  public render() {
    return <Button onClick={this.onClick} label="Profile" />;
  }

  private onClick = () => {
    this.props.router.push('/profile');
  };
}

export default withRouter(ProfileButton);
