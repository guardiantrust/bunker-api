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

var Joi = require('joi');

const schema = Joi.object().keys({
    env: Joi.string().alphanum(),
    log_level: Joi.string(),
    cache_port: Joi.number().min(1000).max(99999)
})

const {err, value: envVars } = Joi.validate(process.env, schema)

if(err) {
    throw new Error('Error with config in EventStream');
}

const config = {
    url: envVars.CACHE_URL,
    port: envVars.CACHE_PORT
}


module.exports = config