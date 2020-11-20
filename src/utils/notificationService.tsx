import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

export const LocalNotification = ({
  title = '',
  subText = '',
  bigText = '',
  message = ' ',
}) => {
  if (Platform.OS === 'android') {
    return PushNotification.localNotification({
      channelId: 'channel-id',
      autoCancel: true,
      bigText,
      subText,
      title,
      message,
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      actions: '["Yes", "No"]',
    });
  }

  if (Platform.OS === 'ios') {
    return PushNotification.localNotification({
      message,
    });
  }
};
