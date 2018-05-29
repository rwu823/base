<p align="center">
  Infrastructure
</p>
<p align="center">
  <a href="https://circleci.com/gh/rwu823/base" alt="Build Status">
    <img src="https://circleci.com/gh/rwu823/base.svg" />
  </a>
  <a href="https://codecov.io/gh/rwu823/base" alt="Coverage">
    <img src="https://img.shields.io/codecov/c/github/rwu823/base/BRANCH.svg?style=flat-square&" />
  </a>
  <img src="https://img.shields.io/github/license/rwu823/base.svg?style=flat-square&" />
</p>

## Infrastructure

Everything you need. it includes:

* ESLint
* TSLint
* tsconfig
* prettier with precommit hook integration
* babel-node / ts-node

## Installation

```sh
yarn add --dev \
https://github.com/rwu823/base\#eslint-config-base \
https://github.com/rwu823/base
```

## Initialization

Add in `.eslintrc`

```json
{
  "extends": ["@rwu823/base"]
}
```

Add in `tslint.json`

```json
{
  "extends": ["@rwu823/base/tslint"]
}
```

Add in `prettier.config.js`

```js
const base = require('@rwu823/base/prettier.config')

module.exports = Object.assign(base, {})
```

Add in `tsconfig.json`

```json
{
  "extends": "./tsconfig.base"
}
```

Add in `package.json`

```json
"scripts": {
  "precommit": "lint-staged"
},
"lint-staged": {
  "*.{ts,tsx}": [
    "prettier --write --parser typescript",
    "git add"
  ],
  "*.{js,jsx,css,md}": [
    "prettier --write --parser babylon",
    "git add"
  ]
},
```

Or run initialization command:

```sh
yarn base-init
```
