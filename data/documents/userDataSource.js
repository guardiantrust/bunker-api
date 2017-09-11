var mongoose = require("../documents/mongodbInstance");
var User = require("../../app/models/user");

module.exports = {
    GetUser: async function(userID) {
        try {
            let user = await User.findById(userID);

            return user;
        } catch (err) {
            console.log('Could not find USER: ' + err);
        }
    }
}