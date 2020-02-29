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

app.use(router)

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
    console.log(`server listening on http://locahost:${port}`)
})
