var producer = require("./kafkaProducer");
var env = require("../../config/index");
producer.Create("user-API");

module.exports = {
    UserCreated: async function(userID) {
        try {
            await producer.Send('userCreated', userID);
        } catch (err) {
            console.log("userCreatedEvent :" + err);
        }
    }
};