var jwtStrategy = require('passport-jwt').Strategy; // used to create, sign, and verify tokens
var extractJWT = require('passport-jwt').ExtractJwt;
var passport = require('passport');
var authDS = require('../../../data/documents/authDataSource');
var env = require('../../../config/index');


async function GetToken(login) {
    authDS.validateLogin(login, function (err, result) {

        if (err) {
            throw new Error(err);
        }

        if (result) {
            var payload = { id: login.userName };
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            return token;
        }
        return null;
    });

}

