const { promisify } = require('util')
const fs = require('fs')

exports.readFile = promisify(fs.readFile)
exports.exists = promisify(fs.exists)
exports.mkdir = promisify(fs.mkdir)
