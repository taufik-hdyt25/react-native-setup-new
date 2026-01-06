/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainRoute from './src/routes';
import { PaperProvider } from 'react-native-paper';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

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
