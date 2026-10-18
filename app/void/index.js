/**
 * @format
 */

// Hermes/React Native ship no URL; it must exist before the app graph loads.
import 'react-native-url-polyfill/auto';

import {AppRegistry, LogBox} from 'react-native';

// Silence LogBox in E2E builds so the in-app warning toast doesn't cover
// chat-bottom controls Appium needs. Left active otherwise so warnings
// surface during development.
if (__E2E__) {
  LogBox.ignoreAllLogs(true);
}

import App from './App';
import {name as appName} from './app.json';

// Register both PocketPal (for native MainActivity) and VOID (for app.json)
AppRegistry.registerComponent('PocketPal', () => App);
AppRegistry.registerComponent('VOID', () => App);
if (appName !== 'PocketPal' && appName !== 'VOID') {
  AppRegistry.registerComponent(appName, () => App);
}
