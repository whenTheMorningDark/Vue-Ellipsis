# vue3-Ellipsis

> 基于 Vue3 的超出宽度显示省略号和tooltips提示框

```bash
npm install vue3-Ellipsis --save
```

## Usage

```vue
<template>
  <div class="wrapper" :style="{ width: `${width}px` }">
    <Ellipsis
      :rows="options.rows"
      :text="options.text"
      :poperOptions="{
          effect: 'light'
        }"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Ellipsis from "./components/Ellipsis.vue"
const options = ref({
  rows: 1,
  text: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
})

const width = ref(200)
</script>
```

```vue
<template>
  <div class="wrapper" :style="{ width: `${width}px` }">
    <span ref="targetRef" v-ellipsis="{ rows: options.rows, text: options.text }" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const options = ref({
  rows: 1,
  text: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
})

const width = ref(200)
</script>
```

```vue
<template>
   <div class="wrapper" :style="{ width: `${width}px` }"  ref="wrapperRef">
    <span ref="targetRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const targetRef = ref()
const width = ref(200)
const options = ref({
  rows: 1,
  text: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
})
useEllipsis(targetRef, options.value, {
  effect: "dark"
})
</script>
```
### Attributes

| 名称          | 说明                                 | 类型                            | 默认值   |
| ----------- | ---------------------------------- | ----------------------------- | ----- |
| rows   | 显示省略的行数         | `number` | 1     |
| showTooltip      | 配置省略时的弹出框 | `boolean`                      | false  |
| text     | 显示的内容        | `string`                      | ''    |
| disabled | 是否禁用     | `boolean`                     | false


### poperOptions（弹出窗属性）

| 名称                        | 说明                                                                                                        | 类型                            | 默认值    |
| ------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ |
| effect                | 主题                                                                                | `dark` / `light` | dark      |
| teleported                    | 是否插入body                                                                        | `boolean`                     | false   |
| showArrow                   | 是否显示箭头                                                                               | `boolean`                      | true     |
| popperClass               | 弹出窗类名                                                                             | `string`                     | ''  |
| offset                 | 出现位置的偏移量                                                                                           | `number`                      | 12 |
| showAfter       | 在触发后多久显示内容，单位毫秒 | `number`                     | 0      |
| hideAfter | 延迟关闭，单位毫秒                                                                                             | `number`                     | 200      |
| placement                  | Tooltip 组件出现的位置                                                                                            | `enum`                     | 'bottom'      |
| zIndex                    | 弹窗层级                                                                                                  | `number`                      | 1024     |
| popperOptions                | [popper.js](https://popper.js.org/docs/v2/) 参数                                                                                                      | `object`                      | {}
