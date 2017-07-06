'use strict'

[
    'ENVIRONMENT',
    'PORT',
    'SECURE_KEY'
].forEach((name) => {
    if(!process.env[name]){
        throw new Error('Environment variable ${name} is missing')
    }
})

const config = {
    env: process.env.ENVIRONMENT,
    log_level: process.env.LOG_LEVEL || 'info',
    server: {
        port: Number(process.env.PORT)
    },
    secureKey: process.env.SECURE_KEY
}

module.exports = config