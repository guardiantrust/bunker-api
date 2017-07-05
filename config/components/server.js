'use strict'

[
    'NODE_ENV',
    'PORT'
].forEach((name) => {
    if(!process.env[name]){
        throw new Error('Enviroment variable ${name} is missing')
    }
})

const config = {
    env: process.env.NODE_ENV,
    log_level: process.env.LOG_LEVEL || 'info',
    server: {
        port: Number(process.env.PORT)
    }
}

module.exports = config