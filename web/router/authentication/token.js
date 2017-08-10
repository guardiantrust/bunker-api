var passport = require("passport");
var authDS = require("../../../data/documents/authDataSource");
var authEvent = require('../../../data/events/authEvent');
var authCache = require("../../../data/cache/authCache");
var env = require("../../../config/index");
var Login = require("../../../models/authentication/login");
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var crypt = require('bcrypt');
authEvent.Create
const salts = 10;


module.exports.GetToken = async function(login) {
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
            console.log("Login Success");
            if (cachedUserPassword === undefined || cachedUserPassword == null) {
                var hashedPassword = await encryptPassword(login.password);
                var [a, b] = await Promise.all([
                    // Save user in cache
                    authCache.AddLogin(login.userName, hashedPassword),
                    // Publish user auth event
                    authEvent.AuthenticateUser(login.userName),
                ]);

            }
            var payload = { id: login.userName };
            var token = jwt.sign(payload, env.secureKey);
            return token;

        }
    } catch (err) {
        console.log("token error: " + err);
    }
};

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