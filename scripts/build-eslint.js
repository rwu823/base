const sh = require('sh-exec')
const write = require('../src/utils/write')
const { stringify } = require('../src/utils/JSON')
const { version } = require('../package.json')

sh`
rm -rf out
mkdir -p out/eslint-config-base
cp .eslintrc.json index.js out/eslint-config-base
`.then(() =>
  write(
    stringify({
      name: '@rwu823/eslint-config-base',
      main: 'index.js',
      version,
    }),
  ).to('out/eslint-config-base/package.json'),
)
