const api = require('express').Router()
const { getVendors, postVendor } = require('./controller')

api.get('/vendors', getVendors)
api.post('/vendors', postVendor)

module.exports = api
