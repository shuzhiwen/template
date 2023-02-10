const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {renderToString} = require('react-dom/server')
const React = require('react')
const {template} = require('./template')
const {App} = require('./page')

app.use(bodyParser.json())
app.use(express.static(__dirname))

// handle cross-origin
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (req.method == 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

app.get('/test', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Content-Type', 'text/html; charset=utf-8')
  res.send(template(renderToString(<App />)))
})

app.listen(8080)
