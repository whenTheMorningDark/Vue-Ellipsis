import { createPopper } from "@popperjs/core"
import type { Instance as PopperInstance } from "@popperjs/core"
import type { Options } from "@popperjs/core"
import { useDelayedToggle } from "./useDelayedToggle"
import { merge } from "lodash-es"
import { ref } from "vue"
const effects = ["light", "dark"] as const

const prefix = "kl"

export type PopperEffect = (typeof effects)[number]

const placements = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end"
] as const

export type placementEmnu = (typeof placements)[number]

// 定义扩展的 Options 类型
export type ExtendedOptions = Partial<Options> & {
  effect?: PopperEffect // 作为可选属性
  teleported?: boolean // 作为可选属性
  showArrow?: boolean // 作为可选属性
  popperClass?: string // 作为可选属性
  offset?: number // 作为可选属性
  showAfter?: number // 作为可选属性
  hideAfter?: number // 作为可选属性
  placement?: placementEmnu
  zIndex?: number
  popperOptions?: Options // 作为可选属性
}
export let removePopper: any
export const createEllipsisPopper = (
  parentNode: HTMLElement | undefined,
  trigger: HTMLElement | Element,
  popperContent: string,
  tooltipOptions?: ExtendedOptions
) => {
  tooltipOptions = merge(
    {
      enterable: true,
      showArrow: true,
      hideAfter: 200,
      showAfter: 0
    } as ExtendedOptions,
    tooltipOptions
  )
  function renderContent(): HTMLDivElement {
    const isLight = tooltipOptions?.effect === "light"
    const content = document.createElement("div")
    content.className = [
      "popper-content-ellipsis",
      isLight ? "is-light" : "is-dark",
      tooltipOptions?.popperClass || ""
    ].join(" ")
    content.innerHTML = popperContent
    content.style.zIndex = `${tooltipOptions?.zIndex || 1024}`
    const targetParent = tooltipOptions?.teleported ? document.body : parentNode
    targetParent?.appendChild(content)
    return content
  }
  function renderArrow(): HTMLDivElement {
    const arrow = document.createElement("div")
    arrow.className = `${prefix}-popper__arrow`
    return arrow
  }
  function showPopper() {
    popperInstance && popperInstance.update()
  }
  removePopper?.()
  removePopper = () => {
    try {
      popperInstance && popperInstance.destroy()
      const targetParent = tooltipOptions?.teleported ? document.body : parentNode
      content && targetParent?.removeChild(content)
      trigger.removeEventListener("mouseenter", onOpen)
      trigger.removeEventListener("mouseleave", onClose)
      removePopper = undefined
    } catch {
      removePopper = undefined
    }
  }
  let popperInstance: PopperInstance | null = null
  let onOpen = showPopper
  let onClose = removePopper
  ;({ onOpen, onClose } = useDelayedToggle({
    showAfter: ref(tooltipOptions.showAfter || 0),
    hideAfter: ref(tooltipOptions.hideAfter || 200),
    open: showPopper,
    close: removePopper,
    autoClose: ref(0)
  }))
  const content = renderContent()
  content.onmouseenter = onOpen
  content.onmouseleave = onClose
  const modifiers = []
  if (tooltipOptions.offset) {
    modifiers.push({
      name: "offset",
      options: {
        offset: [0, tooltipOptions.offset]
      }
    })
  }
  if (tooltipOptions.showArrow) {
    const arrow = content.appendChild(renderArrow())
    modifiers.push({
      name: "arrow",
      options: {
        element: arrow,
        padding: 10
      }
    })
  }
  const popperOptions = tooltipOptions.popperOptions

  popperInstance = createPopper(trigger, content, {
    placement: tooltipOptions.placement || "bottom",
    strategy: "fixed",
    ...popperOptions,
    modifiers: popperOptions?.modifiers ? modifiers.concat(popperOptions?.modifiers as any) : modifiers
  })
  trigger.addEventListener("mouseenter", onOpen)
  trigger.addEventListener("mouseleave", onClose)
  return popperInstance
}
