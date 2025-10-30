/**
 * @format
 */
import 'react-native-gesture-handler'; // ⇠ adicione ESTA linha no topo

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
