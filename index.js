import {AppRegistry} from 'react-native';
import CodePush from "react-native-code-push";
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME };
import _App from './App';
const App = CodePush(codePushOptions)(_App);
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => App);
