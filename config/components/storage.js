var Joi = require('joi');

const schema = Joi.object().keys({
    storage_url: Joi.string(),
    storage_port: Joi.number().min(1000).max(99999),
    storage_secure: Joi.string().allow(['true', 'false']),
    storage_key: Joi.string(),
    storage_secure: Joi.string()
})

const {err, value: envVars } = Joi.validate(process.env, schema)

if(err) {
    throw new Error('Error with config in EventStream');
}

const config = {
    storage_url: process.env.STORAGE_URL,
    storage_port: process.env.STORAGE_PORT,
    storage_secure: process.env.STORAGE_SECURE,
    storage_key: process.env.STORAGE_KEY,
    storage_secret: process.env.STORAGE_SECRET
}


module.exports = config