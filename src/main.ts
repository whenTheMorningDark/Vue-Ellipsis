import { createApp } from "vue"
import App from "./App.vue"
import ElementPlus from "element-plus"
// import vEllipsisPlugin from "../src/packages/index"
import "element-plus/dist/index.css"
// import "../src/packages/style.scss"
const app = createApp(App)
app.use(ElementPlus)
// app.use(vEllipsisPlugin)
app.mount("#app")
