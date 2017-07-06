'use strict'

[
    'STORAGE_URL',
    'STORAGE:PORT',
    'STORAGE_SECURE',
    'STORAGE_KEY',
    'STORAGE_SECRET'
].forEach((name) =>{
    if(!process.env[name]) {
       throw new Error('Environment variable ${name} is missing')
    }
})

var config = {
    url: process.env.STORAGE_URL,
    port: process.env.STORAGE_PORT,
    secure: process.env.STORAGE_SECURE,
    key: process.env.STORAGE_KEY,
    secret: process.env.STORAGE_SECRET
}

module.exports = config