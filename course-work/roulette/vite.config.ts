import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'


const ReactCompilerConfig = {
  target: '18'
};


export default defineConfig({
  plugins: [react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]]
      }
    })],
  css: {
    postcss: {
      plugins: [
        autoprefixer({})
      ],
    }
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['@babylonjs/cores', '@babylonjs/loaders', '@babylonjs/inspector'],
  },
})