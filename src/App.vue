<template>
  <div class="game-play">
    <div class="wrapper" :style="{ width: `${width}px` }">
      <span ref="targetRef" v-ellipsis="{ rows: 1, text: options.text }" />
    </div>
    <div class="wrapper" :style="{ width: `${width}px` }">
      <Ellipsis :rows="1" :text="options.text" />
    </div>
    <div class="wrapper" :style="{ width: `${width}px` }" id="qaq" ref="wrapperRef">
      <span ref="targetRef" />
    </div>

    <el-button @click="change">按钮</el-button>
    <el-button @click="change1">文字</el-button>
    <el-button @click="change2">宽度</el-button>
    <el-button @click="change3">宽度3</el-button>
    <el-button @click="change4">宽度4</el-button>
  </div>
</template>
<script setup lang="ts">
import { useEllipsis } from "../src/packages/useEllipsis"
import { ref } from "vue"
import Ellipsis from "./components/Ellipsis.vue"
const targetRef = ref()
const wrapperRef = ref()
const options = ref({
  rows: 5,
  text: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
})

const width = ref(200)
useEllipsis(targetRef, options.value, {
  effect: "dark"
})
const change = () => {
  options.value.rows = 1
  options.value.text = "占山阿三大苏打实打实的啊实打实大苏打"
}
const change1 = () => {
  options.value.rows = 1
  options.value.text = "啊啊啊嗡嗡嗡"
}
const change2 = () => {
  width.value = 200
}
const change3 = () => {
  width.value = 1000
}
const change4 = () => {
  width.value = 50
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 10px;
  margin: 0 auto;
}
</style>
