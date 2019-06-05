const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./src/index.html', 'utf-8')
})

const result = require('./server_dist/entry-server');

console.log(result)
server.get('*', (req, res) => {
  const context = { url: req.url }
  // const app = createApp(context)

  // renderer.renderToString(app, (err, html) => {
  //   if (err) {
  //     res.status(500).end('Internal Server Error')
  //     return
  //   }
    res.end('success')
  // })
})

server.listen(9999)
