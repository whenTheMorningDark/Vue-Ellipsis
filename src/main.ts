import { createApp } from "vue"
import App from "./App.vue"
import vEllipsisPlugin from "../src/packages/index"
import "../src/packages/style.scss"
const app = createApp(App)
app.use(vEllipsisPlugin)
app.mount("#app")
