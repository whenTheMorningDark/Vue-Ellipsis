import { defineConfig, PluginOption } from "vite"
import vue from "@vitejs/plugin-vue"
import css from "rollup-plugin-css-only" // 引入插件
export default defineConfig({
  plugins: [vue(), css() as PluginOption],
  build: {
    sourcemap: true, // 启用源代码映射
    lib: {
      entry: "./src/packages/index.ts",
      name: "vEllipsis",
      formats: ["umd"]
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        },
        entryFileNames: `vEllipsis.js`
      }
    }
  }
})
