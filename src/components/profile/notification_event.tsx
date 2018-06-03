import * as _ from 'lodash';
import * as React from 'react';

import {
  NOTIFICATION_EVENT_NAMES,
  NOTIFICATION_EVENTS,
  NOTIFICATION_TYPES,
} from '../../models/preferences';
import NotificationField from './notification_field';

export default class NotificationEvent extends React.Component<{
  notificationEvent: NOTIFICATION_EVENTS;
  currentPreferences: NOTIFICATION_TYPES[];
  onChange: (notificationType: NOTIFICATION_TYPES, value: boolean) => void;
}> {
  public render() {
    return (
      <div>
        <h4>{NOTIFICATION_EVENT_NAMES[this.props.notificationEvent]}</h4>
        {/* TODO: Iterate through the list of NOTIFICATION_TYPES so that this list will be generated automatically when we extend the list of notification events or notification types */}
        <NotificationField
          notificationEvent={this.props.notificationEvent}
          notificationType={NOTIFICATION_TYPES.EMAIL}
          selected={_.includes(
            this.props.currentPreferences,
            NOTIFICATION_TYPES.EMAIL,
          )}
          onChange={this.onChange}
        />
      </div>
    );
  }

  private onChange = (notificationType: NOTIFICATION_TYPES, value: boolean) => {
    this.props.onChange(notificationType, value);
  };
}
