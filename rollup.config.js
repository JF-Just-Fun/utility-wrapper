import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const getPlugin = (tscOption = {}) => [resolve(), commonjs(), typescript({ tsconfigOverride: tscOption }), terser()]
const getOutput = moduleName => [
  {
    file: `dist/cjs/${moduleName}/index.js`,
    format: 'cjs',
  },
  {
    file: `dist/esm/${moduleName}/index.js`,
    format: 'esm',
  },
  {
    file: `dist/umd/${moduleName}/index.js`,
    name: moduleName,
    format: 'umd',
  }
]

const mainConfig = {
  input: './index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.umd.js',
      name: "utilityWrapper",
      format: 'umd',
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
}, []).map(file => {
  return {
    input: `./src/${file}/index.ts`,
    output: getOutput(file),
    plugins: getPlugin({
      "compilerOptions": {
        "rootDir": `./src/${file}`
      },
      "include": [`./src/${file}/*.ts`]
    })
  }
})

export default [
  mainConfig,
  ...separateModuleConfig
];
