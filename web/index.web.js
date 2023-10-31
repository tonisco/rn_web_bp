import {AppRegistry} from 'react-native';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';
import {name as appName} from '../app.json';
import App from '../App';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

serviceWorkerRegistration.register();
