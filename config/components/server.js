
var Joi = require('joi');

const schema = Joi.object().keys({
    env: Joi.string().alphanum(),
    log_level: Joi.string(),
    port: Joi.number().min(1000).max(99999),
    secureKey: Joi.string()
})

const {err, value: envVars } = Joi.validate(process.env, schema)

if(err) {
    throw new Error('Error with config in EventStream');
}

const config = {
    env: envVars.ENVIRONMENT,
    log_level: envVars.LOG_LEVEL,
    port: envVars.PORT,
    secureKey: envVars.SECURE_KEY
}


module.exports = config