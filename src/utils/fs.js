const { promisify } = require('util')
const fs = require('fs')

exports.readFile = promisify(fs.readFile).then(buf => buf.toString())
exports.exists = promisify(fs.exists)
exports.mkdir = promisify(fs.mkdir)
