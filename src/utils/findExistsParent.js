const fs = require('fs')
const { promisify } = require('util')
const { dirname, sep, join: pathJoin } = require('path')

const mkdir = promisify(fs.mkdir)

const findExistsParent = promisify((fileName, callback) => {
  const parent = dirname(fileName)

  fs.exists(parent, (isExists) => {
    if (isExists) {
      callback(null, parent)
    } else {
      findExistsParent(parent, callback)
    }
  })
})

const mkdirp = (pathWithPath) =>
  findExistsParent(pathWithPath).then((parent) => {
    const dirs = pathWithPath.replace(`${parent}/`, '').split(sep)

    dirs.reduce(
      (P, dir, i) =>
        P.then(() => mkdir(pathJoin(parent, dirs.slice(0, i).join(sep), dir))),
      Promise.resolve(),
    )
  })

mkdirp('src/a/b/c/d/e/f/g')
