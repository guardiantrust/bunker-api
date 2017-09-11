var cache = require('./redisCache');

module.exports = {
    GetLogin: async function(userName, password) {
        try {
            var result = await cache.client.getAsync(userName);

            if (!result) {
                console.log("authCache: Did not find user in cache!");
            }

            return result;
        } catch (err) {
            console.log("authCache: " + err);
        }
    },
    AddLogin: async function(userName, password) {
        try {
            await cache.client.setAsync(userName, password);
        } catch (err) {
            console.log("authCache: " + err);
        }
    }
}