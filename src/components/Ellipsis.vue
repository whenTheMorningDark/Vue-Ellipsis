<template>
  <span ref="targetRef" />
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useEllipsis } from "../packages/useEllipsis"
import { IOptions } from "../packages/utils"
import { ExtendedOptions } from "../types/index"
type EllipsisProps = IOptions & {
  poperOptions?: ExtendedOptions
}
defineOptions({
  // 命名当前组件
  name: "vueEllipsisTooltip"
})
const props = withDefaults(defineProps<EllipsisProps>(), {
  showTooltip: true
})
const targetRef = ref()
useEllipsis(targetRef, props, props.poperOptions)
</script>
