var jwtStrategy = require("passport-jwt").Strategy; // used to create, sign, and verify tokens
var extractJWT = require("passport-jwt").ExtractJwt;
var passport = require("passport");
var authDS = require("../../../data/documents/authDataSource");
var authCache = require("../../../data/cache/authCache");
var env = require("../../../config/index");
var Login = require("../../../models/authentication/login");

module.exports = {
  GetToken: async function(login) {
    console.log("Username:" + login.userName);
    console.log("Password:" + login.password);
    var userLogin;

    //var login = await authCache.GetLogin(login);
    //if (!login) {
      console.log("Check db!");
      //if (!userLogin) {
        login = await authDS.ValidateLogin(login);
      //}

    // if (err) console.log(err);

    // if (result) {
    //   console.log("Success");
    //   if (result.userName && result.password) {
    //     var payload = { id: logresultin.userName };
    //     var token = jwt.sign(payload, jwtOptions.secretOrKey);
    //     return token;
    //   }
    // }
  }
};
