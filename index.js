const serverless = require('serverless-http');
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/api', function (req, res) {
  res.json({ 'hello': 'world!' })
})

module.exports.handler = serverless(app);