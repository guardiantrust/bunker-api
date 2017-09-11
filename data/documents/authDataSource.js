var mongoose = require("../documents/mongodbInstance");
var Login = require("../../app/models/login");

module.exports = {
    SaveLogin: async function(userID, userName, password) {
        try {
            var newLogin = new Login({
                userID: userID,
                userName: userName,
                password: password,
                lastLogin: Date.now()
            });
            newLogin.save(function(err, login) {
                if (err) {
                    console.log(err);
                }
            });
        } catch (err) {
            console.log("authDataSource: " + err);
        }
    },
    ValidateLogin: async function(userName) {

        try {
            // validate values

            var result = await Login.findOne({'userName': userName}).exec();
            if (!result) {
                console.log("authDataSource: Did not find user in db");
            }
            return result;
        } catch (err) {

            console.log("authDataSource: " + err);
        }
    }
};