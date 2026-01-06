import notifee, { AndroidImportance } from '@notifee/react-native';

export async function showLocalNotification() {
  // Request permission (iOS + Android 13+)
  await notifee.requestPermission();

  // Android channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });

  // Show notification
  await notifee.displayNotification({
    title: '🔔 Local Notification',
    body: 'Ini notifikasi dari button',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      sound: 'default',
    },
  });
}
