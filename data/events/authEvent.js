var producer = require("./kafkaProducer");
var env = require("../../config/index");
producer.Create("authenticate-API");

module.exports = {
  AuthenticateUser: async function(userName) {
    try {
      await producer.Send('auth', userName);
    } catch (err) {
      console.log("authEvent :" + err);
    }
  }
};
