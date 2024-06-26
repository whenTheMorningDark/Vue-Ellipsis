# vue3-Ellipsis

> 基于 Vue3 的超出宽度显示省略号和tooltips提示框

## Install

```bash
npm install vue-ellipsis-tooltip --save
```
## Attention
使用该组件时，需要注意父容器有宽度或者最大最小宽度，否则无法生效！HTML需要设置标准的line-height:1.15!!

## Preview
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4d66b067445468fb025cbbdd1c9e3e2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=496&h=187&s=14935&e=png&b=ffffff)

## Usage
[例子](https://github.com/whenTheMorningDark/Vue-Ellipsis/blob/main/src/App.vue)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./style.css">
    <style>
      .wrapper{
        margin: 0 auto;
      }
    </style>
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/3.3.4/vue.cjs.prod.min.js"></script>
    <script src="./vEllipsis.js"></script>
</head>
<body>
    <div id="app">
        <div class="wrapper" :style="{ width: '200px' }">
          <span  v-ellipsis="{ rows: 1, text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaazzzzzzzzzz' }" />
        </div>
        <div class="wrapper" :style="{ width: `200px` }">
          <vue-ellipsis-tooltip :rows="3" text=" A design is a plan or specification for the" />
        </div>
    </div>
    <script>
        const App = {
          data() {
            return {
              message: "Hello Element Plus",
            };
          },
        };
        const app = Vue.createApp(App);
        app.use(vEllipsis);
        app.mount("#app");
      </script>
</body>
</html>
```
## 组件形式

```vue
<template>
  <div class="wrapper" :style="{ width: `${width}px` }">
    <vue-ellipsis-tooltip
      :rows="options.rows"
      :text="options.text"
      :poperOptions="{
          effect: 'light'
        }"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import {vue-ellipsis-tooltip} from "vue-ellipsis-tooltip"
const options = ref({
  rows: 1,
  text: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
})

const width = ref(200)
</script>
```
## 指令形式

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
## hook形式

```vue
<template>
   <div class="wrapper" :style="{ width: `${width}px` }"  ref="wrapperRef">
    <span ref="targetRef" />
  </div>
</template>

<script setup lang="ts">
import { useEllipsis } from "vue-ellipsis-tooltip"
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

## Usage（在脚手架中使用）

main.ts
```js
import { createApp } from 'vue'
import "vue-ellipsis-tooltip/dist/style.css"
import vEllipsis from "vue-ellipsis-tooltip"
import App from './App.vue'
const app = createApp(App)
app.use(vEllipsis)
app.mount('#app')
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
