/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { initPushNotification } from '@/utils/pushNofication';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { getMessaging } from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert, StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainRoute from './src/routes';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const unsubscribe = getMessaging().onMessage(async remoteMessage => {
      const channelId = await notifee.createChannel({
        id: 'push-channel',
        name: 'Push Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });

      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId,
        },
        ios: {
          sound: 'default',
        },
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function getToken() {
      await getMessaging().requestPermission();
      await getMessaging().deleteToken(); // 🔥 PAKSA TOKEN BARU
      const token = await getMessaging().getToken();
      console.log('FCM TOKEN >>>', token);
    }
    getToken();
  }, []);

  useEffect(() => {
    initPushNotification();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar />
        <MainRoute />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
