import sucrase from '@rollup/plugin-sucrase'
import fg from 'fast-glob'
import dts from 'rollup-plugin-dts'

/** @type {import('rollup').RollupOptions[]} */
const options = [
  {
    input: fg.sync('src/**/*.ts'),
    output: {
      preserveModules: true,
      format: 'cjs',
      dir: 'dist/cjs'
    },
    treeshake: true,
    plugins: [sucrase({
      exclude: ['node_modules'],
      transforms: ['typescript']
    })]
  },
  {
    input: fg.sync('src/lib/**/*.ts'),
    output: {
      preserveModules: true,
      format: 'esm',
      dir: 'dist/esm'
    },
    treeshake: true,
    plugins: [sucrase({
      exclude: ['node_modules'],
      transforms: ['typescript']
    })]
  },
  {
    input: fg.sync('src/lib/**/*.ts'),
    output: {
      preserveModules: true,
      format: 'esm',
      dir: 'dist/esm'
    },
    treeshake: true,
    plugins: [dts()]
  }
]

export default options
