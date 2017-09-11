var passport = require("passport");
var authDS = require("../../../data/documents/authDataSource");
var User = require("../../../data/documents/userDataSource");
var authEvent = require('../../../data/events/authEvent');
var authCache = require("../../../data/cache/authCache");
var env = require("../../../config/index");
var Login = require("../../../app/models/login");
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var crypt = require('bcrypt');
const salts = 10;


module.exports = {
    GetToken: async function(login) {
        var userLoggedIn = false;
        try {
            //Check Cache for user
            var cachedUserPassword = await authCache.GetLogin(login.userName);
            if (cachedUserPassword != undefined || cachedUserPassword != null) {
                userLoggedIn = await checkPassword(login.password, cachedUserPassword);
            } else {
                // Check DB for user
                var userLogin = await authDS.ValidateLogin(login.userName);
                if (userLogin != undefined) {
                    userLoggedIn = await checkPassword(login.password, userLogin.password);
                }
            }

            if (!userLoggedIn) {
                return null;
            } else {
                if (cachedUserPassword === undefined || cachedUserPassword == null) {

                    var hashedPassword = await encryptPassword(login.password);

                    authCache.AddLogin(login.userName, hashedPassword);
                }
                authEvent.AuthenticateUser(login.userName);
                //let user = await User.GetUser(login.userID)
                var payload = { id: login.userName, userID: login.userID };
                let token = jwt.sign(payload, env.secureKey);
                console.log(token);
                return token;

            }
        } catch (err) {
            console.log("token error: " + err);
        }

    },
    ParseToken: async function(token) {
        try {
            var userInfo = jwt.decode(token);
            return userInfo;
        } catch (err) {
            console.log("token invalid: " + err);
        }
    }
}

var encryptPassword = async function(password) {
    try {
        var hashedPassword = await crypt.hash(password, salts);
        console.log(hashedPassword);
        return hashedPassword;
    } catch (err) {
        console.log("token - encryptPassword:" + err);
    }
};

var checkPassword = async function(password, hashedPassword) {
    try {
        //console.log(password + " " + hashedPassword);
        var isEqual = await crypt.compare(password, hashedPassword);
        return isEqual;
    } catch (err) {
        console.log("token - checkPassword: " + err);
    }
};