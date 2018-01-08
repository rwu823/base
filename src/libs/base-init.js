// const { extname } = require('path')
const { promisify } = require('util')
const glob = promisify(require('glob'))
const c = require('chalk')

const write = require('../utils/write')
const { parseJSON, stringify } = require('../utils/JSON')
const { readFile, exists, mkdir } = require('../utils/fs')
const packageJSON = require('../../package.json')

Promise.all([
  glob('.eslintrc*'),
  glob('tslint.json'),
  glob('*prettier*'),
  glob('tsconfig.json'),
  glob('.vscode/launch.json'),
]).then(async ([eslints, tslints, prettiers, tsconfigs, vscodeLaunchJSONs]) => {
  /**
   * .eslintrc
   */
  if (eslints.length) {
    console.log(`${c.cyan(eslints[0])} is already exist.`)
  } else {
    write(
      stringify({
        extends: [packageJSON.name],
      }),
    ).to('.eslintrc')
  }

  /**
   * prettier.config.js
   */
  if (prettiers.length) {
    console.log(`${c.cyan(prettiers[0])} is already exist.`)
  } else {
    write(`const base = require('${packageJSON.name}/prettier.config')

module.exports = Object.assign(base, {})
`).to('prettier.config.js')
  }

  /**
   * tslint.json
   */
  if (tslints.length) {
    console.log(`${c.cyan('tslint.json')} is already exist.`)
  } else {
    write(stringify({ extends: [`${packageJSON.name}/tslint`] })).to(
      'tslint.json',
    )
  }

  /**
   * =tsconfig.json
   */
  write(await readFile(`node_modules/${packageJSON.name}/tsconfig.json`)).to(
    'tsconfig.base.json',
  )
  if (tsconfigs.length) {
    console.log(`${c.cyan('tsconfig.json')} is already exist.`)
  } else {
    write(stringify({ extends: `./tsconfig.base` })).to('tsconfig.json')
  }

  /**
   * package.json
   */
  const pkg = parseJSON(await readFile('package.json'))
  if (!pkg.scripts) {
    pkg.scripts = {}
  }

  if (!pkg.scripts.precommit) {
    pkg.scripts.precommit = packageJSON.scripts.precommit
  }

  if (!pkg['lint-staged']) {
    pkg['lint-staged'] = {}
  }

  Object.assign(pkg['lint-staged'], packageJSON['lint-staged'])
  write(stringify(pkg)).to('package.json')

  /**
   * .vscode/launch.json
   */
  if (vscodeLaunchJSONs.length) {
    console.log(`${c.cyan(vscodeLaunchJSONs[0])} is already exist.`)
  } else {
    if (!await exists('.vscode')) {
      await mkdir('.vscode')
    }

    write(`// For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387\n
      ${stringify(
        parseJSON(
          await readFile(
            `node_modules/${packageJSON.name}/.vscode/launch.json`,
          ),
        ),
      )}`).to('.vscode/launch.json')
  }
})

process.on('unhandledRejection', r => console.log(r.stack))
