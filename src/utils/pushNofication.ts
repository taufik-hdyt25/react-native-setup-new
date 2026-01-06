import messaging from '@react-native-firebase/messaging';

export async function initPushNotification() {
  await messaging().requestPermission();

  const token = await messaging().getToken();
  console.log('FCM TOKEN:', token);

  // ⬅️ kirim token ini ke backend
}
