import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import './vite.init';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: { port: 4000 },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      'ant-design-vue/es': path.resolve(__dirname, '../components'),
      'ant-design-vue': path.resolve(__dirname, '../components'),
    },
  },
  plugins: [vueJsx(), vue()],
  css: {
    postcss: {
      plugins: [],
    },
    preprocessorOptions: {
      scss: {
        // additionalData: `@use '../components/style/common/var.scss' as *;@use '../components/style/mixins/index.scss' as *;@import '../components/style/mixins/mixins.scss';`,
        // additionalData: `@use '../components/style/mixins/mixins.scss' as *;`,
      },
    },
  },
});
