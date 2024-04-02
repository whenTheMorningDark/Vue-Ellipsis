import { type IOptions } from "./utils"
import { type Directive, type DirectiveBinding } from "vue"
import { calcEllipsisFullAndText, defaultOptions } from "./utils"
import { type ExtendedOptions } from "./createEllipsisPopper"
// 定义指令绑定的值类型
export type EllipsisDirectiveValue = IOptions & {
  poperOptions?: ExtendedOptions
}
export type EllipsisDirectiveBinding = DirectiveBinding<EllipsisDirectiveValue>

const bind = (el: HTMLElement, binding: EllipsisDirectiveValue): void => {
  const textContent = binding.text || el.textContent || ""
  const { poperOptions, ...reset } = binding
  const options = { ...defaultOptions, ...reset }
  calcEllipsisFullAndText(el, textContent, options, poperOptions)
}

const rebind = (el: HTMLElement, bindingValue: EllipsisDirectiveValue): void => {
  bind(el, bindingValue)
}

export const vEllipsis: Directive<HTMLElement, EllipsisDirectiveValue> = {
  mounted(el, binding) {
    if (!(el instanceof HTMLElement)) {
      console.error("vEllipsis directive is only applicable to HTMLElements.")
      return
    }
    bind(el, binding.value)
  },
  updated(el, binding) {
    if (!(el instanceof HTMLElement)) {
      return
    }
    rebind(el, binding.value)
  },
  beforeUnmount(el) {
    console.log(el, "unbind")
    // 如果有需要在元素卸载前执行的逻辑，可以在这里处理
  }
}
