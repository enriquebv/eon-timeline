import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { babel } from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'

const COMMON = {
  input: 'src/index.ts',
  external: (id) => !/^[./]/.test(id),
}

const COMMON_JS_BUNDLE = {
  ...COMMON,
  output: [
    {
      file: './dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: './dist/index.mjs',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    esbuild(),
    babel({ babelHelpers: 'bundled' }),
    copy({
      targets: [{ src: 'src/styles.css', dest: 'dist' }],
    }),
  ],
}

const ES_BUNDLE = {
  ...COMMON,
  plugins: [dts()],
  output: {
    file: './dist/index.d.ts',
    format: 'es',
  },
}

export default [COMMON_JS_BUNDLE, ES_BUNDLE]
