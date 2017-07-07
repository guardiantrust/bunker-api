var cache = require('./redisCache');

module.exports = {
    GetLogin:  function (login) {
        try {
            var result = cache.client.getAsync(login.userName).result;
            if (!result) {
                console.log("authCache: Did not find user in cache!");
            }
            return result;
        }
        catch (err) {
            console.log("authCache: " + err);
        }
    }
}