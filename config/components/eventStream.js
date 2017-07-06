var Joi = require('joi');

const schema = Joi.object().keys({
    url: Joi.string().alphanum(),
    port: Joi.number().min(1000).max(99999)
})

const {err, value: envVars } = Joi.validate(process.env, schema)

if(err) {
    throw new Error('Error with config in EventStream');
}

const config = {
    url: envVars.EVENTSTREAM_URL,
    port: envVars.EVENTSTREAM_PORT
}


module.exports = config
