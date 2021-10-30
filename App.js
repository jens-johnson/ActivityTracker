import React from 'react';
import Navigation from './components/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

export default function App() {
  let [fontsLoaded] = useFonts({ Roboto_400Regular });

  if (!fontsLoaded) {
    return <AppLoading/>;
  }
  else {
    return (
      <NativeBaseProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
