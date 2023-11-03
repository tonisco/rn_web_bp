import { AppRegistry } from "react-native"

import App from "../App"
import { name as appName } from "../app.json"

import registerServiceWorker from "./serviceWorkerRegistration"

AppRegistry.registerComponent(appName, () => App)
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("root"),
})

//  WORKBOX throws warning in watch mode and constantly refreshes
if (process.env.NODE_ENV === "production") {
  registerServiceWorker()
}
