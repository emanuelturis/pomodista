/**
 * @format
 */

// Fix for crypto.getRandomValues() not supported
import 'react-native-get-random-values';

import {AppRegistry, Platform} from 'react-native';
import App from './src/components/App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
  onRegister: function (token) {
    console.log('Token: ', token);
  },

  onNotification: function (notification) {
    console.log('Notification: ', JSON.stringify(notification));

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  popInitialNotification: true,

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  requestPermissions: Platform.OS === 'ios',
});

if (Platform.OS === 'android') {
  PushNotification.createChannel(
    {
      channelId: 'channel-id',
      channelName: 'My channel',
    },
    (created) => console.log(`createChannel returned '${created}'`),
  );
}

AppRegistry.registerComponent(appName, () => App);
