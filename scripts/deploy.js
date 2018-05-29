const sh = require('sh-exec')

const { version, repository } = require('../package.json')

const {
  GH_TOKEN,
  // NPM_TOKEN,
} = process.env

const tokenRepo = repository.replace(/(github.com)/, `${GH_TOKEN}@$1`)
// const tag = `v${version}`

sh`
  git config --global user.email "auto_deploy@circleci.com"
  git config --global user.name "CircleCI"
`
sh`
  cd out/eslint-config-base
  git init
  git add .
  git commit -nm '${version}'
  git push ${tokenRepo} HEAD:eslint-config-base -f
`
