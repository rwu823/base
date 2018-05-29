const { createWriteStream } = require('fs')
const stream = require('stream')
const c = require('chalk')

const wm = new WeakMap()
class Write {
  constructor(text = '') {
    const p = wm.set(this, {}).get(this)

    p.text = text
  }

  to(fileName = '') {
    const p = wm.get(this)

    return new Promise((resolve, reject) => {
      const sr = new stream.Readable()
      sr.push(p.text)
      sr.push(null)

      sr.pipe(createWriteStream(fileName))
        .on('finish', (res) => {
          console.log(`Updated ${c.cyan(fileName)}`)
          resolve(res)
        })
        .on('error', reject)
    })
  }
}

module.exports = (text = '') => new Write(text)
