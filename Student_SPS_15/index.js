/**
 * Лабораторная работа № 15. Основные компоненты React Native
 * Точка входа приложения
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
