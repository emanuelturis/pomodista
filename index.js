/**
 * @format
 */

// Fix for crypto.getRandomValues() not supported
import 'react-native-get-random-values';

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    notification.finish();
  },

  popInitialNotification: true,

  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
  {
    channelId: 'channel-id', // (required)
    channelName: 'My channel', // (required)
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

AppRegistry.registerComponent(appName, () => App);
