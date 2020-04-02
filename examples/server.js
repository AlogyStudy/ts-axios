const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const bodyParser = require('body-parser')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend: true}))

const router = express.Router()

router.get('/simple/get', (req, res) => {
    res.json({
        msg: 'hello word'
    })
})

router.get('/base/get', (req, res) => {
    res.json(req.query)
})

router.post('/base/post', function(req, res) {
    res.json(req.body)
})

router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
        res.json({
            msg: 'hello world'
        })
    } else {
        res.status(500)
        res.end()
    }
})

router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
        res.json({
            msg: 'hello world'
        })
    }, 2000)
})

router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', (chunk) => {
        if (chunk) {
            msg.push(chunk)
        }
    })
    req.on('end', (chunk) => {
        let buf = Buffer.concat(msg)
        res.json(buf.toJSON())
    })
})

router.post('/extend/post', function(req, res) {
    res.json(req.body)
})

router.get('/extend/get', function(req, res) {
    res.json({
        msg: 'hello world get'
    })
})

app.use(router)

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
    console.log(`server listening on http://locahost:${port}`)
})
