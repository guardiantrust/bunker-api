'use strict'

[
    'REDIS_URL',
    'REDIS_PORT'
].forEach((name) => {
    if(!process.env[name]) {
        throw new Error('Environment variable ${name} is missing')
    }
})

const config = {
    redis_url: process.env.REDIS_URL,
    redis_port: process.env.REDIS_PORT
}

module.exports = config