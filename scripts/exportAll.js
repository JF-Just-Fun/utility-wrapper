const fs = require('node:fs');
const path = require('node:path');
const url = require('node:url')
const { Project } = require("ts-morph");

const srcDir = path.resolve(__dirname, '../src')

const files = fs.readdirSync(srcDir)
const exportContent = files.reduce((content, file) => {
  const fileDir = path.resolve(__dirname, '../src', file)
  if (fs.statSync(fileDir).isDirectory()) {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(path.resolve(fileDir, 'index.ts'));

    const hasDefaultExport = sourceFile.getExportSymbols().some(symbol =>
        symbol.getName() === "default" || symbol.getDeclarations().some(declaration => declaration.isDefaultExport())
    );

    content += `export * from './src/${file}';\n`

    if (hasDefaultExport) {
      content += `export { default as ${file} } from './src/${file}';\n`
    }
  }

  return content
}, '')

fs.writeFileSync(path.resolve(__dirname, '../index.ts'), exportContent, 'utf-8');
