'use strict'

class Index {
  optionDefinitions () {
    return {
      name: 'index.root', type: String, typeLabel: '[underline]{path}',
      description: 'Index root directory, defaults to --directory value or current directory.'
    }
  }
  middleware (options) {
    options = Object.assign({ icons: true, hidden: true }, options)
    const path = options.directory || process.cwd()
    if (path) {
      const serveIndex = require('koa-serve-index')
      return serveIndex(path, options)
    }
  }
}

module.exports = Index
