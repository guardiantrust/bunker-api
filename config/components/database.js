var Joi = require('joi');

const schema = Joi.object().keys({
    db_connection: Joi.string(),
    db_username: Joi.string(),
    db_password: Joi.string()
})

const {err, value: envVars } = Joi.validate(process.env, schema)

if(err) {
    throw new Error('Error with config in EventStream');
}

const config = {
    db_connection: envVars.DB_CONNECTION,
    db_username: envVars.DB_USERNAME,
    db_password: envVars.DB_PASSWORD
}


module.exports = config