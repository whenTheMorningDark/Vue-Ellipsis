<template>
  <span ref="targetRef" />
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useEllipsis } from "../packages/useEllipsis"
import { IOptions } from "../packages/utils"
defineOptions({
  // 命名当前组件
  name: "kEllipsis"
})
const props = withDefaults(defineProps<IOptions>(), {
  showTooltip: true
})
const targetRef = ref()
useEllipsis(targetRef, props)
</script>
