import React from 'react';
import { Application } from 'ui/components';
import { getLogger } from 'service/logging';

const logger = getLogger('expo-application');

/**
 * Entry point for Expo application
 *
 * @return {JSX.Element} - The root application
 * @constructor
 */
export default function App() {
  logger.info({ message:'Application initialized' });
  return <Application />
}
