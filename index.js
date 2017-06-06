'use strict'

class Index {
  description () {
    return 'Serves directory listings.'
  }
  optionDefinitions () {
    return [
      {
        name: 'index.root',
        type: String,
        typeLabel: '[underline]{path}',
        description: 'Index root directory, defaults to --directory or the current directory.'
      },
      {
        name: 'index.hidden',
        type: Boolean,
        description: 'Show hidden files.'
      },
      {
        name: 'index.view',
        type: String,
        typeLabel: '[underline]{name}',
        description: 'Display mode, either `tiles` or `details`. Defaults to tiles.'
      }
    ]
  }
  middleware (options) {
    const path = options.indexRoot || options.directory || process.cwd()
    if (path) {
      const serveIndex = require('serve-index-75lb')
      const index = serveIndex(path, {
        icons: true,
        hidden: options.indexHidden,
        view: options.indexView
      })
      return (ctx, next) => {
        return new Promise((resolve, reject) => {
          index(ctx.req, ctx.res, resolve)
        })
      }
    }
  }
}

module.exports = Index
