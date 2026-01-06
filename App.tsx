/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { listenForegroundNotification } from '@/utils/notifications/foreground';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainRoute from './src/routes';
import {
  initPushNotification,
  listenTokenRefresh,
} from './src/utils/notifications/index';

function App() {
  useEffect(() => {
    initPushNotification();
    const unsubToken = listenTokenRefresh();
    const unsubForeground = listenForegroundNotification();
    return () => {
      unsubToken();
      unsubForeground();
    };
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
