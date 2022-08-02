import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//elementPlus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //elementPlus
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),],
  // 跨域
  server: {
    proxy: {
      "/api": {
        target: "http://passport.bilibili.com",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api", ""),
      }
    }
  }
})
