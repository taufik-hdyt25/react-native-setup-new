import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('BG message:', remoteMessage);

  const channelId = await notifee.createChannel({
    id: 'push-channel',
    name: 'Push Channel',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title ?? 'Notifikasi',
    body: remoteMessage.notification?.body ?? '',
    android: {
      channelId,
      pressAction: { id: 'default' },
    },
    ios: { sound: 'default' },
  });
});
