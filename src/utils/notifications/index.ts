import messaging from '@react-native-firebase/messaging';

export async function initPushNotification() {
  // 1. Permission
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    console.log('Push permission not granted');
    return;
  }

  // 2. Get token
  const token = await messaging().getToken();
  console.log('FCM TOKEN:', token);

  // 3. TODO: kirim token ke backend
}

export function listenTokenRefresh() {
  return messaging().onTokenRefresh(token => {
    console.log('FCM TOKEN REFRESH:', token);
    // kirim ulang ke backend
  });
}
