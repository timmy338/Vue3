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
      "/passport": {
        target: "http://passport.bilibili.com",
        changeOrigin: true,
        rewrite: (path) => path.replace("/passport", ""),
      },
      "/api": {
        target: "http://api.bilibili.com",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api", ""),
        headers: {
          Referrer: 'http://bilibili.com',
        }
      },

    }
  }
})
