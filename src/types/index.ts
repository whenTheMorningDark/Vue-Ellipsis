import type { Options } from "@popperjs/core"
const effects = ["light", "dark"] as const
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

export interface IOptions {
  rows?: number
  showTooltip?: boolean
  text?: string
  disabled?: boolean
}
