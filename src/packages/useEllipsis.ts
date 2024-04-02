import type { ComponentPublicInstance, MaybeRef } from "vue"
import { onMounted, nextTick, unref, watch, ref, getCurrentInstance } from "vue"
import { useResizeObserver } from "@vueuse/core"
import { type ExtendedOptions } from "./createEllipsisPopper"
import { calcEllipsisFullAndText, defaultOptions } from "./utils"
import { type IOptions } from "./utils"
export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T)
export type MaybeElement = HTMLElement | Element | ComponentPublicInstance | undefined | null
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeRefOrGetter<T>
export type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends ComponentPublicInstance
  ? Exclude<MaybeElement, ComponentPublicInstance>
  : T | undefined
export type AnyFn = (...args: any[]) => any

export function toValue<T>(r: MaybeRefOrGetter<T>): T {
  return typeof r === "function" ? (r as AnyFn)() : unref(r)
}
export function unrefElement<T extends MaybeElement>(elRef: MaybeComputedElementRef<T>): UnRefElementReturn<T> {
  const plain = toValue(elRef)
  return (plain as ComponentPublicInstance)?.$el ?? plain
}

export function getLifeCycleTarget(target?: any) {
  return target || getCurrentInstance()
}
export type Fn = () => void
export function tryOnMounted(fn: Fn, sync = true, target?: any) {
  const instance = getLifeCycleTarget()
  if (instance) {
    onMounted(fn, target)
  } else if (sync) {
    fn()
  } else {
    nextTick(fn)
  }
}

const useEllipsis = (target: MaybeElementRef, options?: IOptions, poperOptions?: ExtendedOptions) => {
  const fullText = ref(options?.text || "")
  let firstInit = true
  watch(
    () => options?.rows,
    async (nVal) => {
      const newOptions = {
        rows: nVal || 1,
        ...options
      }
      const ele = unrefElement(target) as HTMLElement
      calcEllipsisFullAndText(ele, fullText.value, newOptions, poperOptions)
    }
  )

  watch(
    () => options?.text,
    async (nVal) => {
      const newOptions = {
        text: nVal || "",
        ...options
      }
      if (fullText.value === nVal) {
        return
      }
      const textContent = options?.text || ""
      fullText.value = textContent
      const ele = unrefElement(target) as HTMLElement
      calcEllipsisFullAndText(ele, fullText.value, newOptions, poperOptions)
    }
  )

  watch(
    () => options?.disabled,
    async (nVal) => {
      const newOptions = {
        disabled: nVal,
        ...options
      }
      const textContent = options?.text || ""
      fullText.value = textContent
      const ele = unrefElement(target) as HTMLElement
      calcEllipsisFullAndText(ele, fullText.value, newOptions, poperOptions)
    }
  )

  tryOnMounted(() => {
    const el = unrefElement(target)
    if (!el || !(el.parentNode instanceof HTMLElement)) return

    options = { ...defaultOptions, ...options }
    console.log(options, "optionszzzzzzz")

    const textContent = options?.text || el.textContent || ""
    fullText.value = textContent
    calcEllipsisFullAndText(el as HTMLElement, textContent, options, poperOptions)

    useResizeObserver(el.parentNode, () => {
      if (!firstInit) {
        const textContent = options?.text || el.textContent || ""
        calcEllipsisFullAndText(el as HTMLElement, fullText.value, options, poperOptions)
        fullText.value = textContent
      } else {
        firstInit = false
      }
    })
  }, false)

  return {
    options
  }
}
export { useEllipsis }
