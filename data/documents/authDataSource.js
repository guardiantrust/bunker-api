var mongoose = require('../documents/mongodbInstance');
var Login = require('../../models/authentication/login');



module.exports = {
    ValidateLogin:  function (login) {
        try {
            // validate values
            if (!login.userName || !login.password) {
                console.log("authDataSource: Error with Credentials");
                return false;
            }
            var result = Login.findOne({ userName: login.userName }).exec();
            if (!result) {
                console.log("authDataSource: Did not find user in db");
            }
            
            return result;

        }
        catch (err) {
            console.log("authDataSource: " + err);
        }
    }
}




