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
            } else {
                //Delete old token
                await tokenDS.DeleteToken(user._id);
            }

            var newToken = new Token({
                userID: user._id,
                companyID: user.companyID,
                issuedAt: Date.now(),
                expiresAt: Date.now() + (2 * 60 * 60 * 1000)
            });

            let token = jwt.sign(newToken.toJSON(), env.secureKey);
            // Add token to new Token schema - we do this after the JWT is created to reduce reduncency
            newToken.token = token;
            // Save new token
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
            var tok = new Token(parsedToken);
            //Check parsed token is valid
            if (!tok.userID || !tok.companyID) {
                return res.status(403).send({
                    success: false,
                    message: 'Token invalid format.'
                });
            }

            // Check token has not expired
            if (tok.expiresAt < Date.now()) {
                console.log(Date.now());
                console.log('Token Expired');
            }

            if (!valid) {
                // Check token is in cache
                var cachedTokenResult = await authCache.GetLogin(tok.userID)
                var cachedToken = JSON.parse(cachedTokenResult);

                if (cachedToken.token == token) {
                    valid = true;
                    console.debug('Authenticated in Cache');
                } else {
                    console.log('Token not in cache');
                }
            }

            if (!valid) {
                //Check token is in DB
                var dbToken = await tokenDS.GetToken(tok.userID);
                if (dbToken.token == token) {
                    valid = true;
                    console.debug('Autnenticated in DB');
                } else {
                    console.log('Token not in DB');
                }
            }

            if (!valid) {
                // Something didnt pass - fail and cleanup
                //Delete from Cache
                authCache.RemoveLogin(tok.userID);
                // Delete from DB
                tokenDS.DeleteToken(parsedToken.userID);

                return res.status(403).send({
                    success: false,
                    message: 'Token Invalid.'
                });
            }
            else {
                next();
            }

        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }

    },
    GetCompanyIDFromToken: function(token) {
        try{
            var parsedToken = jwt.decode(token);
            var tok = new Token(parsedToken);
            return tok.companyID;
        } catch(err) {
            console.log("tokenMethods - GetCompanyIDFromToken : " + err);
        }
    }

}

var encryptPassword = async function (password) {
    try {
        var hashedPassword = await crypt.hash(password, salts);
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