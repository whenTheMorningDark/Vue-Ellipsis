import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
export default defineConfig({
  plugins: [vue()],
  build: {
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
        entryFileNames: `vEllipsis.js`,
        assetFileNames: "[name].[ext]" // 资源文件像 字体，图片等
      }
    }
  }
})
