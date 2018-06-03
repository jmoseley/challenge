import * as _ from 'lodash';
import * as React from 'react';
import {
  NOTIFICATION_EVENTS,
  NOTIFICATION_TYPES,
  SetNotificationPreferencesOptions,
} from '../../models/preferences';
import NotificationEvent from './notification_event';

export interface Props {
  user: Meteor.User;
}

export default class NotificationPreferences extends React.Component<Props> {
  // Set default values/
  public componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.user) {
      return;
    }
    if (!_.get(nextProps.user, 'preferences.notifications')) {
      if (!_.get(nextProps.user, 'preferences')) {
        nextProps.user.preferences = {} as Meteor.User.Preferences;
      }
      nextProps.user.preferences.notifications = {
        [NOTIFICATION_EVENTS.CHALLENGE_INVITE]: [NOTIFICATION_TYPES.EMAIL],
        [NOTIFICATION_EVENTS.CHALLENGE_ACTIVITY]: [NOTIFICATION_TYPES.EMAIL],
      };
    }
  }
  public render() {
    return (
      <div>
        <h3>Notification Preferences</h3>
        {/* TODO: Iterate through the list of NOTIFICATION_EVENTS so that this list will be generated automatically when we extend the list of notification events or notification types */}
        <NotificationEvent
          notificationEvent={NOTIFICATION_EVENTS.CHALLENGE_INVITE}
          currentPreferences={_.get(
            this.props.user,
            `preferences.notifications.${NOTIFICATION_EVENTS.CHALLENGE_INVITE}`,
            [],
          )}
          onChange={_.partial(
            this.updatePreference,
            NOTIFICATION_EVENTS.CHALLENGE_INVITE,
          )}
        />
        <NotificationEvent
          notificationEvent={NOTIFICATION_EVENTS.CHALLENGE_ACTIVITY}
          currentPreferences={_.get(
            this.props.user,
            `preferences.notifications.${
              NOTIFICATION_EVENTS.CHALLENGE_ACTIVITY
            }`,
            [],
          )}
          onChange={_.partial(
            this.updatePreference,
            NOTIFICATION_EVENTS.CHALLENGE_ACTIVITY,
          )}
        />
      </div>
    );
  }

  private updatePreference = (
    notificationEvent: NOTIFICATION_EVENTS,
    notificationType: NOTIFICATION_TYPES,
    value: boolean,
  ) => {
    const args: SetNotificationPreferencesOptions = {
      newValue: value,
      notificationEvent,
      notificationType,
    };

    Meteor.call(
      'preferences.notifications.set',
      args,
      (error: Meteor.Error, r: any) => {
        if (error) {
          alert(error);
        }
      },
    );
  };
}
