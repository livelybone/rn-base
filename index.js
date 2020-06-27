/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from '@/App'
import { name as appName } from './app.json'
import {
  subscribeMsg,
  initMsgModule,
} from '@/common/services/RemoteNotification'
import LocalStorage from '@/localStorage'

initMsgModule()
subscribeMsg()
LocalStorage.init().then(() => {
  AppRegistry.registerComponent(appName, () => App)
})
