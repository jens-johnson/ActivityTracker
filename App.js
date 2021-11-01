import React from 'react';
import { NavigationProvider } from './components/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { theme } from './styles';

export default function App() {
  let [fontsLoaded] = useFonts({ Roboto_400Regular });

  if (!fontsLoaded) {
    return <AppLoading/>;
  }
  else {
    return (
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationProvider />
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
