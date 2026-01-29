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

import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

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
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <StatusBar barStyle={'dark-content'} />
          <MainRoute />
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
