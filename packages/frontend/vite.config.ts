import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    unocss(),
    components({
      dts: true,
      extensions: ['vue', 'tsx'],
      // directoryAsNamespace: true,
      resolvers: [NaiveUiResolver()],
    }),
    autoImport({
      dts: true,
      dirs: ['./src/hooks', './src/stores'],
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
    }),
    vueJsx(),
  ],
  build: {
    outDir: '../../dist/public',
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      'my-utils': path.resolve(__dirname, '../myUtils/dist/esm'),  // 替换为实际路径
    },
  },
})
