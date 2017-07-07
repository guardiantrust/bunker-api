var jwtStrategy = require('passport-jwt').Strategy; // used to create, sign, and verify tokens
var extractJWT = require('passport-jwt').ExtractJwt;
var passport = require('passport');
var authDS = require('../../../data/documents/authDataSource');
var authCache = require('../../../data/cache/authCache');
var env = require('../../../config/index');
var Login = require('../../../models/authentication/login');


module.exports = {
    GetToken: function (login) {
        console.log("Username:" + login.userName);
        console.log("Password:" + login.password);
        try {
            var userLogin = new Login();

            //check cache for user info
            userLogin = authCache.GetLogin(login);

            if (!userLogin) {
                // check db for user
                userLogin = authDS.ValidateLogin(login);
                console.log("db.Username:" + userLogin.userName);
                console.log("db.Password:" + userLogin.password);
            }

            if (userLogin.userName && userLogin.password) {
                var payload = { id: login.userName };
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                return token;
            }
            return null;
        }
        catch (err) {
            console.log("token: " + err);
        }
    }
}
