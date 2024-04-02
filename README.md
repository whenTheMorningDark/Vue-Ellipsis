v-contextmenu
NPM version NPM download NPM version License Node version

NPM

适用于 Vue 3.0 的 ContextMenu 组件。

适用于 Vue 2.0 的文档见 <https://github.com/CyberNika/v-contextmenu/blob/2.x/docs/usage.md>

简体中文 | (WIP) English

🚀 安装
NPM 安装（推荐）
$ npm i -S v-contextmenu # yarn add v-contextmenu
CDN 引入
可通过 unpkg.com/v-contextmenu 获取最新版本的资源，在页面中引入相应 js 和 css 文件即可。

<!-- 引入 Vue -->
<script src="https://unpkg.com/vue"></script>

<!-- 引入 VContextmenu 组件 -->
<script src="https://unpkg.com/v-contextmenu/dist/index.min.js"></script>

<!-- 引入 VContextmenu 组件样式 -->
<link
  rel="stylesheet"
  href="https://unpkg.com/v-contextmenu/dist/themes/default.css"
/>
// 全局注册
Vue.use(window.contextmenu);

// 或按需注册
const { directive, Contextmenu, ContextmenuItem } = window.contextmenu;

export default {
  directives: {
    contextmenu: directive,
  },

  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
  },
};
🏖 概览
访问在线示例

概览

🎏 使用
全局注册
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";

Vue.use(contextmenu);
<template>
  <v-contextmenu ref="contextmenu">
    <v-contextmenu-item>菜单1</v-contextmenu-item>
    <v-contextmenu-item>菜单2</v-contextmenu-item>
    <v-contextmenu-item>菜单3</v-contextmenu-item>
  </v-contextmenu>

  <div v-contextmenu:contextmenu>右键点击此区域</div>
</template>
按需注册
<template>
  <v-contextmenu ref="contextmenu">
    <v-contextmenu-item>菜单1</v-contextmenu-item>
    <v-contextmenu-item>菜单2</v-contextmenu-item>
    <v-contextmenu-item>菜单3</v-contextmenu-item>
  </v-contextmenu>

  <div v-contextmenu:contextmenu>右键点击此区域</div>
</template>

<script>
import { directive, Contextmenu, ContextmenuItem } from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";

export default {
  directives: {
    contextmenu: directive,
  },

  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
  }
}
</script>
详细使用方法见 在线站点 & 文档

🎨 主题
默认

v-contextmenu/dist/themes/default.css

default

亮色

v-contextmenu/dist/themes/bright.css

bright

暗色

v-contextmenu/dist/themes/dark.css

dark

🛠 开发
$ pnpm install # 安装依赖
$ pnpm dev # 启动开发服务
🤖 构建
$ pnpm build # 构建 npm 包
$ pnpm build:site # 构建站点
