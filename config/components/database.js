'use strict'

[
    'DB_CONNECTION',
    'DB_USERNAME',
    'DB_PASSWORD'
].forEach((name0=> {
    if(!process.env[name]) {
        throw new Error('Environment variable ${name} is missing')
    }
}))

const config = {
    db_connection: process.env.DB_CONNECTION,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD
}

module.exports = config