import { AppRegistry } from "react-native"
import registerServiceWorker from "./serviceWorkerRegistration"
import { name as appName } from "../app.json"
import App from "../App"

AppRegistry.registerComponent(appName, () => App)
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("root"),
})

//  WORKBOX throws warning in watch mode and constantly refreshes
if (process.env.NODE_ENV === "production") {
  registerServiceWorker()
}
