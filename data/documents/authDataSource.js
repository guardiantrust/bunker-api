var mongoose = require("../documents/mongodbInstance");
var Login = require("../../models/authentication/login");

module.exports = {
  SaveLogin: async function (userName, password) {
    try {
      var newLogin = new Login({
        userName: userName,
        password: password,
        lastLogin: Date.now()
      });
      newLogin.save(function (err, login) {
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
  ValidateLogin: async function (userName) {

    try {
      // validate values

      var result = await Login.findOne({ 'userName': userName }).exec();
      if (!result) {
        console.log("authDataSource: Did not find user in db");
      }

      return result;
    } catch (err) {

      console.log("authDataSource: " + err);
    }
  }
};
