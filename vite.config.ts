import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' 
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from "unplugin-auto-import/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'packages/assets/icons/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
    AutoImport({
      // 自动导入 Vue 相关函数
      imports: ["vue"],
      // 生成类型声明文件
      dts: true,
      // 自动导入目录下的模块
      dirs: ["./packages/lite-flow/**"],
      // 自动导入 Vue 模板中的组件
      vueTemplate: true,
      }),
  ]
})
