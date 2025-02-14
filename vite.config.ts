import path from 'node:path';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

import { getFileList } from './tools/get_file_list';

const publicDir = path.resolve(__dirname, './public');
const getPublicFileList = async (targetPath: string) => {
  const filePaths = await getFileList(targetPath);
  const publicFiles = filePaths
    .map((filePath) => path.relative(publicDir, filePath))
    .map((filePath) => path.join('/', filePath));

  return publicFiles;
};

export default defineConfig(async ({ mode }) => {
  const videos = await getPublicFileList(path.resolve(publicDir, 'videos'));

  return {
    build: {
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      minify: mode === 'production' ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('zipcode-ja')) {
              return 'zipcode-ja';
            }
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
        plugins: [
          mode === 'analyze' &&
            visualizer({
              brotliSize: true,
              filename: 'dist/stats.html',
              gzipSize: true,
              open: true,
            }),
          splitVendorChunkPlugin(),
        ],
      },
      target: 'esnext',
    },
    plugins: [
      react(),
      wasm(),
      topLevelAwait(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
        videos,
      }),
    ],
  };
});
