const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false,
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const router = express.Router()

router.get('/simple/get', (req, res) => {
  res.json({
    msg: 'simple server'
  })
})

router.get('/params/get', (req, res) => {
  res.json(req.query)
})

router.post('/body/post', (req, res) => {
  res.json(req.body)
})

router.post('/buffer/post', (req, res) => {
  let msg = []
  req.on('data', chunk => {
    chunk && msg.push(chunk)
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get', (req, res) => {
  if(Math.random() > 0.5) {
    res.json({
      msg: 'lucky'
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({
      msg: 'test timeout'
    })
  }, 3600)
})

app.use(router)

const port = process.env.PORT || 3000
module.exports = app.listen(port, () => {
  console.log(`running at: http://localhost:${port}`)
})
