import * as React from 'react';

import {
  NOTIFICATION_EVENTS,
  NOTIFICATION_TYPE_NAMES,
  NOTIFICATION_TYPES,
} from '../../models/preferences';

export default class NotificationField extends React.Component<{
  notificationEvent: NOTIFICATION_EVENTS;
  notificationType: NOTIFICATION_TYPES;
  selected?: boolean;
  onChange: (notificationType: NOTIFICATION_TYPES, value: boolean) => void;
}> {
  public render() {
    return (
      <div>
        <label
          htmlFor={`${this.props.notificationType}-${
            this.props.notificationEvent
          }`}
        >
          {NOTIFICATION_TYPE_NAMES[this.props.notificationType]}
        </label>
        <input
          type="checkbox"
          checked={this.props.selected}
          id={`${this.props.notificationType}-${this.props.notificationEvent}`}
          name={this.props.notificationEvent}
          value={this.props.notificationType}
          onChange={this.onChange}
        />
      </div>
    );
  }

  private onChange = (event: any) => {
    this.props.onChange(this.props.notificationType, event.target.checked);
  };
}
