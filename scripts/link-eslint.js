const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')

const cwd = (...args) => path.join('../../../', ...args)

const [scope] = pkg.name.split('/')

const isExists = (p) => {
  try {
    fs.statSync(p)
    return true
  } catch (er) {
    return false
  }
}
const eslintPath = cwd(`/node_modules/${scope}/eslint-config-base`)

if (isExists(cwd(`/node_modules/${pkg.name}`)) && !isExists(eslintPath)) {
  fs.symlink('./base/eslint-config-base', eslintPath, (error) => {
    if (error) {
      console.log(error)
    }
  })
}
