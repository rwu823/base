const { readFile } = require('./fs')
const { parseJSON } = require('./JSON')
const write = require('./write')
const pkg = require('../../package.json')

module.exports = async (fileName) => {
  const txt = await readFile(`${fileName}.json`)
  const rc = parseJSON(txt)

  let fillTxt = ''

  if (Array.isArray(rc.extends)) {
    fillTxt = txt.replace(
      /"extends"[^[]*\[/,
      (m) => `${m}\n"${pkg.name}/${fileName}",`,
    )
  } else {
    fillTxt = txt.replace(
      /\{/,
      (m) => `${m}\n"extends": ["${pkg.name}/${fileName}"],`,
    )
  }

  if (fillTxt) {
    write(fillTxt).to(`${fileName}.json`)
  }
}
