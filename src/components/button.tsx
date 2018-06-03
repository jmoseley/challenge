import * as dapper from '@convoy/dapper';
import * as React from 'react';

// http://www.colourlovers.com/palette/92095/Giant_Goldfish
const STYLES = dapper.compile({
  button: {
    backgroundColor: '#FA6900',
    borderRadius: '3px',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontFamily: `sans-serif`,
    padding: '7px',
  },
});

export interface Props {
  onClick: () => void;
  label: string;
}

export default class Button extends React.Component<Props> {
  public styles: any = dapper.reactTo(this, STYLES);

  public render() {
    return (
      <div>
        <span onClick={this.props.onClick} className={this.styles.button}>
          {this.props.label}
        </span>
      </div>
    );
  }
}
