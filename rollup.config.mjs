import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { babel } from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'

const external = (id) => !/^[./]/.test(id)

const bundleCode = (dir, extraPlugins = []) => ({
  input: `${dir}/src/index.ts`,
  external,
  output: [
    {
      file: `./${dir}/dist/index.js`,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: `./${dir}/dist/index.mjs`,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [esbuild(), babel({ babelHelpers: 'bundled' }), ...extraPlugins],
})

const bundleTypes = (dir) => ({
  input: `${dir}/src/index.ts`,
  external,
  plugins: [dts()],
  output: {
    file: `${dir}/dist/index.d.ts`,
    format: 'es',
  },
})

const core = [
  bundleCode('core', [
    copy({
      targets: [{ src: 'core/src/styles.css', dest: 'core/dist' }],
    }),
  ]),
  bundleTypes('core'),
]
const reactComponent = [bundleCode('components/react'), bundleTypes('components/react')]

export default [...core, ...reactComponent]
