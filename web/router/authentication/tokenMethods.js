var passport = require("passport");
var authDS = require("../../../data/documents/authDataSource");
var User = require("../../../data/documents/userDataSource");
var tokenDS = require("../../../data/documents/tokenDataSource");
var authEvent = require('../../../data/events/authEvent');
var authCache = require("../../../data/cache/authCache");
var env = require("../../../config/index");
var Login = require("../../../app/models/login");
var Token = require("../../../app/models/token");
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var crypt = require('bcrypt');
const salts = 10;
var date = require('time');

module.exports = {
    GetToken: async function (login) {
        var userLoggedIn = false;
        try {
            // Check DB for user
            var userLogin = await authDS.ValidateLogin(login.userName);
            if (userLogin != undefined) {

                userLoggedIn = await checkPassword(login.password, userLogin.password);
                if (!userLoggedIn) {
                    return null;
                }
            }

            var hashedPassword = await encryptPassword(login.password);
            login.password = hashedPassword;

            authEvent.AuthenticateUser(userLogin.userID);
            let user = await User.GetUser(userLogin.userID)
            if (!user || !user.isActive) {
                console.log(login.userID);
                return null;
            }

            var newToken = new Token({
                userID: user._id,
                companyID: user.companyID,
                issuedAt: Date.now(),
                expiresAt: Date.now() + (2 * 60 * 60 * 1000)
            });
            //var payload = { id: login.userID, userName: login.userName, companyID: };
            let token = jwt.sign(newToken.toJSON(), env.secureKey);
            newToken.token = token;
            tokenDS.SaveToken(newToken);
            authCache.AddLogin(newToken);
            return token;


        } catch (err) {
            console.log("token error: " + err);
        }

    },
    ParseToken: async function (token) {
        try {
            var userInfo = jwt.decode(token);
            return userInfo;
        } catch (err) {
            console.log("token invalid: " + err);
        }
    },
    AuthenticateToken: async function (req, res, next) {
        var valid = false;
        var token = req.headers['x-access-token'];

        if (token) {
            var parsedToken = jwt.decode(token);
            console.log(parsedToken);
            //Check parsed token is valid
            if (!parsedToken || !parsedToken.userID || !parsedToken.companyID) {
                return res.status(403).send({
                    success: false,
                    message: 'Token invalid format.'
                });
            } else {
                console.log('Token not valid');
            }
            // Check token has not expired
            if (parsedToken && parsedToken.expiresAt > Date.now()) {
                next();
                valid = true;
            } else {
                console.log(Date.now());
                console.log('Token Expired');
            }
            // Check token is in cache
            var cachedToken = await authCache.GetLogin(parsedToken.userID)
            if (cachedToken && cachedToken == token) {
                next();
                valid = true;
            } else {
                console.log('Token not in cache');
            }

            //Check token is in DB
            var dbToken = await tokenDS.GetToken(parsedToken.userID);
            if (dbToken && dbToken.token == token) {
                next();
                valid = true;
            } else {
                console.log('Token not in DB');
            }

            if (!valid) {
                // Something didnt pass - fail and cleanup
                authCache.RemoveLogin(token.userID);
                tokenDS.DeleteToken(parsedToken.userID);

                return res.status(403).send({
                    success: false,
                    message: 'Token Invalid.'
                });
            }

        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }

    }

}

var encryptPassword = async function (password) {
    try {
        var hashedPassword = await crypt.hash(password, salts);
        console.log(hashedPassword);
        return hashedPassword;
    } catch (err) {
        console.log("token - encryptPassword:" + err);
    }
};

var checkPassword = async function (password, hashedPassword) {
    try {
        //console.log(password + " " + hashedPassword);
        var isEqual = await crypt.compare(password, hashedPassword);
        return isEqual;
    } catch (err) {
        console.log("token - checkPassword: " + err);
    }
};