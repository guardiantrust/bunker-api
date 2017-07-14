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
    kafka_url: envVars.EVENT_STREAM_URL,
    auth_topic: envVars.EVENT_STREAM_AUTH_TOPIC
}


module.exports = config
