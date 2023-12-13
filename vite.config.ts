import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import solidPlugin from 'vite-plugin-solid';
import path from 'node:path';
import pkg from './package.json';
import tsconfig from './tsconfig.json';

const pathResolve = (_path: string) => path.resolve(__dirname, _path);

export default defineConfig({
  publicDir: false,
  plugins: [
    dts({
      rollupTypes: true,
      outDir: pathResolve('./dist/types'),
    }),
    solidPlugin({
      include: 'lib/**/*',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
  build: {
    target: tsconfig.compilerOptions.target,
    outDir: pathResolve('./dist'),
    cssCodeSplit: true,
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
      output: {
        preserveModules: false,
        exports: 'named',
        globals: {
          'solid-js': 'solidJs',
        },
        assetFileNames: 'styles/styles.css',
      },
    },
    emptyOutDir: false,
    copyPublicDir: false,
    lib: {
      name: pkg.name,
      entry: pathResolve('./lib/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') {
          return 'esm/index.js';
        }

        if (format === 'cjs') {
          return 'cjs/index.js';
        }

        return '';
      },
    },
  },
});
