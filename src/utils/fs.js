const { promisify } = require('util')
const fs = require('fs')

exports.readFile = (...args) =>
  promisify(fs.readFile)(...args).then((buf) => buf.toString())

exports.exists = promisify(fs.exists)
exports.mkdir = promisify(fs.mkdir)
