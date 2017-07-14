var producer = require("./kafkaProducer");
var env = require("../../config/index");
producer.Create("authenticate-API");

module.exports = {
    AuthenticateUser: async function(userName) {
        try {
            console.log('send auth');
            await producer.Send('auth', userName);
            console.log('send auth complete');
        } catch (err) {
            console.log("authEvent :" + err);
        }
    }
};