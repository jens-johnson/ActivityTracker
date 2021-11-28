import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { getLogger } from 'service/logging';
import utils from 'ui/utils';
import { NavigationProvider } from 'ui/components/navigation';
import { theme } from 'ui/styles';

const logger = getLogger('core-application');

/**
 * Core Activity Tracker application initializing Native Base and Safe Area providers over Navigation
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function Application() {
  logger.info({
    message:'Application initialized'
  });

  useEffect(() => {
    utils.dev.suppressWarnings();
  }, []);

  let [ fontsLoaded ] = useFonts({ Roboto_400Regular });

  if (!fontsLoaded) {
    return <AppLoading/>;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationProvider />
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
