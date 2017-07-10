var mongoose = require("../documents/mongodbInstance");
var Login = require("../../models/authentication/login");

module.exports = {
  SaveLogin: async function(login) {
    try {
      var newLogin = new Login({
        userName: login.userName,
        password: login.password,
        lastLogin: Date.now()
      });
      newLogin.save(function(err, login) {
        if (!err) {
          console.log("User saved" + newLogin);
        } else {
          console.log(err);
        }
      });
    } catch (err) {
      console.log("authDataSource: " + err);
    }
  },
  ValidateLogin: async function(login) {
    try {
      // validate values
      if (!login.userName || !login.password) {
        console.log("authDataSource: Error with Credentials");
        return false;
      }

      var result = await Login.findOne({ userName: login.userName }).exec();
      console.log("Searchine for login" + result);
      if (!result) {
        console.log("authDataSource: Did not find user in db");
      }

      return result;
    } catch (err) {
      console.log("authDataSource: " + err);
    }
  }
};
