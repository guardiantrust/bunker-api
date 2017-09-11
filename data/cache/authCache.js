var cache = require('./redisCache');
var Token = require("../../app/models/token");
module.exports = {
    GetLogin: async function(userID) {
        try {
            var result = await cache.client.getAsync(userID);

            if (!result) {
                console.log("authCache: Did not find user in cache!");
            }

            return result;
        } catch (err) {
            console.log("authCache: " + err);
        }
    },
    AddLogin: async function(token) {
        try {
            var t = new Token({
                userID: token.userID,
                companyID: token.companyID,
                issuedAt: token.issuedAt,
                expiresAt: token.expiresAt,
                token: token.token
            })
            await cache.client.setAsync(token.userID, JSON.stringify(t));
        } catch (err) {
            console.log("authCache: " + err);
        }
    },
    RemoveLogin: async function(userID) {
        try{
            await cache.client.del(userID);
        } catch (err) {
            console.log("Error in authCache - RemoveLogin :" + err);
        }
    }
}