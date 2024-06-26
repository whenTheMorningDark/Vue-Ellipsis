import { vEllipsis } from "./vEllipsis"
import { type App } from "vue"
import Ellipsis from "../components/Ellipsis.vue"
import { version } from "../../package.json"
import { useEllipsis } from "./useEllipsis"
import "./style.scss"
const install = (app: App): void => {
  app.directive("ellipsis", vEllipsis)
  app.component(Ellipsis.name!, Ellipsis)
}
const vEllipsisPlugin = {
  install,
  version
}
const vueEllipsisTooltip = Ellipsis
export { vEllipsis, install, version, useEllipsis, vueEllipsisTooltip }
export default vEllipsisPlugin
