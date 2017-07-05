'use strict'

[
    'KAFKA_URL',
    'KAFKA_PORT'
].forEach((name) => {
    if(!process.env[name]) {
        throw new Error('Environment variable ${name} is missing')
    }
})

const config = {
    url: process.env.KAFKA_URL,
    port: process.env.KAFKA_PORT
}

module.exports = config
