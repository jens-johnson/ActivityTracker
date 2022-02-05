import React from 'react';

import AppLoading from 'expo-app-loading';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

import logging from 'common/logging';
import { theme } from 'ui/styles';

import { NavigationProvider } from './navigation';

const logger = logging.getLogger('core-application');

/**
 * Core Activity Tracker application; constructs application using wrappers
 *
 * @constructor
 */
function Application() {
  logger.info({
    message: 'Application initialized'
  });

  const [ fontsLoaded ] = useFonts({ Roboto_400Regular });

  return fontsLoaded
    ? (
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationProvider />
        </SafeAreaProvider>
      </NativeBaseProvider>
    )
    : (
      <AppLoading />
    );
}

export default Application;
