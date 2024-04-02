import { useEventListener } from "@vueuse/core"
import { createEllipsisPopper } from "./createEllipsisPopper"
import { type ExtendedOptions } from "./createEllipsisPopper"
type InitElementDomReturn = {
  el: HTMLElement | Element
  parentNode: HTMLElement
  maxHeight: number
} | null
export interface IOptions {
  rows?: number
  showTooltip?: boolean
  text?: string
  disabled?: boolean
  isDirective?: boolean
}
function pxToNumber(value: string | null): number {
  if (!value) return 0

  const match = value.match(/^\d*(\.\d*)?/)

  return match ? Number(match[0]) : 0
}

export const initElementDom = (rows = 1, el: HTMLElement): InitElementDomReturn => {
  if (el && el.parentNode instanceof HTMLElement) {
    const parentNode = el.parentNode
    const originStyle = window.getComputedStyle(parentNode)
    const lineHeight = pxToNumber(originStyle.lineHeight)
    const maxHeight = Math.round(
      lineHeight * rows + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom)
    )
    return {
      el,
      parentNode,
      maxHeight
    }
  }
  return null
}
let ellipsisContainer: HTMLElement | null

function styleToString(style: CSSStyleDeclaration) {
  const styleNames: string[] = Array.prototype.slice.apply(style)
  return styleNames.map((name) => `${name}: ${style.getPropertyValue(name)};`).join("")
}
function createMeasureContainer(originElement: HTMLElement) {
  if (!ellipsisContainer) {
    ellipsisContainer = document.createElement("div")
    document.body.appendChild(ellipsisContainer)
  }
  const originStyle = window.getComputedStyle(originElement)
  const styleString = styleToString(originStyle)
  ellipsisContainer.setAttribute("style", styleString)
  ellipsisContainer.setAttribute("aria-hidden", "true")
  ellipsisContainer.style.height = "auto"
  ellipsisContainer.style.minHeight = "auto"
  ellipsisContainer.style.maxHeight = "auto"
  ellipsisContainer.style.position = "fixed"
  ellipsisContainer.style.left = "0"
  ellipsisContainer.style.top = "-99999999px"
  ellipsisContainer.style.zIndex = "-200"
  ellipsisContainer.style.whiteSpace = "normal"
  ellipsisContainer.style.wordBreak = "break-all"
  return ellipsisContainer
}
export const getEllipsisText = (parentNode: HTMLElement, fullText: string, maxHeight: number) => {
  const ellipsisContainer = createMeasureContainer(parentNode)
  ellipsisContainer.innerHTML = ""

  const textNode = document.createTextNode(fullText)
  ellipsisContainer.appendChild(textNode)

  // 检查当前文本是否满足高度条件
  function inRange() {
    return ellipsisContainer.offsetHeight <= maxHeight
  }
  if (inRange()) {
    return {
      ellipsis: false,
      text: fullText
    }
  }

  // 寻找最多的文字
  function measureText(startLoc = 0, endLoc = fullText.length, lastSuccessLoc = 0) {
    if (startLoc > endLoc) {
      // 找到满足条件的最长文本，清理并返回结果
      const finalText = fullText.slice(0, lastSuccessLoc) + "..."
      return {
        ellipsis: true,
        text: finalText
      }
      // return finalText
    }

    const midLoc = Math.floor((startLoc + endLoc) / 2)
    textNode.textContent = fullText.slice(0, midLoc) + "..."

    if (inRange()) {
      return measureText(midLoc + 1, endLoc, midLoc)
    } else {
      return measureText(startLoc, midLoc - 1, lastSuccessLoc)
    }
  }
  return measureText()
}
let enterEvent: any
const enterEventArr: any[] = []
export const calcEllipsisFullAndText = (
  element: HTMLElement,
  fullText: string,
  options?: IOptions,
  poperOptions?: ExtendedOptions
) => {
  const elementDom = initElementDom(options?.rows, element)
  if (!elementDom) {
    return
  }
  const { el, parentNode, maxHeight } = elementDom
  const { text, ellipsis } = getEllipsisText(parentNode, fullText, maxHeight)
  el.innerHTML = text
  el.className = [options?.disabled ? "is-disabled" : "", "kl-trigger"].join(" ")
  if (ellipsis) {
    requestAnimationFrame(() => {
      enterEvent = useEventListener(el, "mouseenter", () => {
        createEllipsisPopper(parentNode, el, fullText, poperOptions)
      })
      enterEventArr.push(enterEvent)
    })
  } else {
    if (enterEventArr && enterEventArr.length > 0) {
      enterEventArr.forEach((s) => s())
    }
  }

  return {
    el,
    fullText,
    text,
    ellipsis
  }
}
