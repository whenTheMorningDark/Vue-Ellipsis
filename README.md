# vue3-Ellipsis

> 基于 Vue3 的超出宽度显示省略号和tooltips提示框

```bash
npm install vue3-Ellipsis --save
```

## Usage

```vue
<template>
  <div class="wrapper" :style="{ width: `${width}px` }">
    <Ellipsis :rows="options.rows" :text="options.text" />
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
