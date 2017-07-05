'use strict'

const kafka = require('./components/kafka')
const redis = require('./components/redis')
const server = require('./components/server')

module.exports = Object.assign({}, kafka, redis, server)