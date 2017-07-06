'use strict'

const eventStream = require('./components/eventStream')
const cache = require('./components/cache')
const server = require('./components/server')
const database = require('./components/database')
const storage = require('./components/storage')

module.exports = Object.assign({}, eventStream, cache, database, storage, server)