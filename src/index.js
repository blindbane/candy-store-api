const serverless = require('serverless-http');
const express = require('express')
const api = require('./api')
const cors = require('cors')
const app = express()


app.use(cors())

app.use('/api', api)

module.exports.handler = serverless(app);