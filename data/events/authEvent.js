var producer = require('./kafkaProducer');
var env = require('../../config/index');

module.exports = {
    AuthenticateUser: async function(userName) {
        try{
            await producer.send({
                topic: env.auth_topic,
                partition: 0,
                message: {
                    key: 'authenticate',
                    value: userName
                }
            });

        } catch(err){
            console.log("authEvent :" + err);
        }

    }
}