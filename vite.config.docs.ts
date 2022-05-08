import eslintPlugin from '@modyqyw/vite-plugin-eslint';
import { defineConfig, type UserConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
const config: UserConfig = {
  base: './',
  // Resolver
  resolve: {
    // https://vitejs.dev/config/#resolve-alias
    alias: [
      {
        // vue @ shortcut fix
        find: '@/',
        replacement: `${path.resolve(__dirname, './src')}/`,
      },
      {
        find: 'src/',
        replacement: `${path.resolve(__dirname, './src')}/`,
      },
    ],
  },
  // https://vitejs.dev/config/#server-options
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  plugins: [
    Vue(),
    // eslint
    // https://github.com/ModyQyW/vite-plugin-eslint
    eslintPlugin(),
  ],
  // Build Options
  // https://vitejs.dev/config/#build-options
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-demi'],
          lodash: ['lodash'],
          codemirror: [
            '@codemirror/state',
            '@codemirror/view',
            '@codemirror/basic-setup',
          ],
          codemirrorLanguage: [
            '@codemirror/lang-html',
            '@codemirror/lang-javascript',
            '@codemirror/lang-markdown',
          ],
        },
      },
    },
    target: 'es2021',
  },
};

// Export vite config
export default defineConfig(config);