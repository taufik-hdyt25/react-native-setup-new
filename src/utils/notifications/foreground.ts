import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export function listenForegroundNotification() {
  return messaging().onMessage(async remoteMessage => {
    console.log('FG message:', remoteMessage);

    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      android: {
        channelId: 'push-channel',
      },
    });
  });
}
