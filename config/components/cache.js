var Joi = require('joi');

const schema = Joi.object().keys({
    cache_url: Joi.string().alphanum(),
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