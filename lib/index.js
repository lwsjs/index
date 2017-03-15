'use strict'

class Index {
  optionDefinitions () {
    return [
      {
        name: 'index.root', type: String, typeLabel: '[underline]{path}',
        description: 'Index root directory, defaults to --static.root or the current directory.'
      },
      {
        name: 'index.hidden', type: Boolean,
        description: 'Show hidden files.'
      },
      {
        name: 'index.view', type: String, typeLabel: '[underline]{name}',
        description: 'Display mode, either `tiles` or `details`. Defaults to tiles.'
      }
    ]
  }
  middleware (options) {
    const path = options['index.root'] || options['static.root'] || process.cwd()
    if (path) {
      const serveIndex = require('serve-index')
      const index = serveIndex(path, {
        icons: true,
        hidden: options['index.hidden'],
        view: options['index.view']
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
