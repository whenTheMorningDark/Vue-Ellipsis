import { createPopper } from "@popperjs/core"
import type { Instance as PopperInstance } from "@popperjs/core"
import { useDelayedToggle } from "./useDelayedToggle"
import { ExtendedOptions } from "../types/index"
import { merge } from "lodash-es"
import { ref } from "vue"

const prefix = "kl"

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
