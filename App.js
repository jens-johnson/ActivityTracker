import React from 'react';
import Application from 'ui/components';
import logging from 'common/logging';

const logger = logging.getLogger('expo-application');

/**
 * Root App component that serves as the entry point for the Expo application
 *
 * @component
 */
function App() {
  logger.info({
    event: 'initApplication',
    message: 'Application initialized'
  });
  return <Application />
}

export default App;
