const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./src/index.html', 'utf-8')
})

const entryServer = require('./server_dist/entry-server');

server.get('*', (req, res) => {
  const context = { url: req.url }

  entryServer.default(context).then(app => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(html)
      }
    })
  }).catch(e => {
    res.status(500).end('Internal Server Error')
  })
})

server.listen(9999)
