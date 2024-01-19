import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import typescript from '@rollup/plugin-typescript';
import fs from 'node:fs';
import path from 'node:path';

const tsConfigPath = path.resolve(__dirname, 'tsconfig.json')
const getPlugin = (overwriteTscOption = {}) => {
  return [resolve(), commonjs(), typescript({ ...overwriteTscOption, tsconfig: tsConfigPath }), terser()]
}
const getOutput = (moduleName) => [
  {
    file: `dist/${moduleName}/index.cjs.js`,
    name: moduleName,
    format: 'cjs',
    exports: 'auto',
  },
  {
    file: `dist/${moduleName}/index.esm.js`,
    name: moduleName,
    format: 'esm',
    exports: 'auto',
  },
  {
    file: `dist/${moduleName}/index.umd.js`,
    name: moduleName,
    format: 'umd',
    exports: 'auto',
  }
]

const mainConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      exports: 'auto',
    },
    {
      file: 'dist/index.umd.js',
      name: "utilityWrapper",
      format: 'umd',
      exports: 'auto',
    }
  ],
  plugins: getPlugin()
}

const srcDir = path.resolve('./src')
const separateModuleConfig = fs.readdirSync(srcDir).reduce((acc, file) => {
  if (fs.statSync(path.resolve('./src', file)).isDirectory()) {
    acc.push(file)
  }
  return acc
}, []).map(moduleName => {
  return {
    input: `./src/${moduleName}/index.ts`,
    output: getOutput(moduleName),
    plugins: getPlugin({
      "compilerOptions": {
        "declaration": false,
        "declarationDir": undefined
      }
    })
  }
})

export default [
  mainConfig,
  ...separateModuleConfig
];
