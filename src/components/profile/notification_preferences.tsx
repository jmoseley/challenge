import * as _ from 'lodash';
import * as React from 'react';
import { preferences, User } from '../../models';
import NotificationEvent from './notification_event';

export interface Props {
  user: User;
}

export default class NotificationPreferences extends React.Component<Props> {
  // Set default values/
  public componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.user) {
      return;
    }
    if (!_.get(nextProps.user, 'preferences.notifications')) {
      if (!_.get(nextProps.user, 'preferences')) {
        nextProps.user.preferences = {} as preferences.Preferences;
      }
      nextProps.user.preferences.notifications = {
        [preferences.NOTIFICATION_EVENTS.CHALLENGE_INVITE]: [
          preferences.NOTIFICATION_TYPES.EMAIL,
        ],
        [preferences.NOTIFICATION_EVENTS.CHALLENGE_ACTIVITY]: [
          preferences.NOTIFICATION_TYPES.EMAIL,
        ],
      };
    }
  }
  public render() {
    return (
      <div>
        <h3>Notification Preferences</h3>
        {/* TODO: Iterate through the list of NOTIFICATION_EVENTS so that this list will be generated automatically when we extend the list of notification events or notification types */}
        <NotificationEvent
          notificationEvent={preferences.NOTIFICATION_EVENTS.CHALLENGE_INVITE}
          currentPreferences={_.get(
            this.props.user,
            `preferences.notifications.${
              preferences.NOTIFICATION_EVENTS.CHALLENGE_INVITE
            }`,
            [],
          )}
          onChange={_.partial(
            this.updatePreference,
            preferences.NOTIFICATION_EVENTS.CHALLENGE_INVITE,
          )}
        />
        <NotificationEvent
          notificationEvent={preferences.NOTIFICATION_EVENTS.CHALLENGE_ACTIVITY}
          currentPreferences={_.get(
            this.props.user,
            `preferences.notifications.${
              preferences.NOTIFICATION_EVENTS.CHALLENGE_ACTIVITY
            }`,
            [],
          )}
          onChange={_.partial(
            this.updatePreference,
            preferences.NOTIFICATION_EVENTS.CHALLENGE_ACTIVITY,
          )}
        />
      </div>
    );
  }

  private updatePreference = (
    notificationEvent: preferences.NOTIFICATION_EVENTS,
    notificationType: preferences.NOTIFICATION_TYPES,
    value: boolean,
  ) => {
    // const args: preferences.SetNotificationPreferencesOptions = {
    //   newValue: value,
    //   notificationEvent,
    //   notificationType,
    // };
    // Meteor.call(
    //   'preferences.notifications.set',
    //   args,
    //   (error: Meteor.Error, r: any) => {
    //     if (error) {
    //       alert(error);
    //     }
    //   },
    // );
  };
}
