var cache = require('./redisCache');
var stringify = require('json-stringify');

module.exports = {
    GetCompany: async function (companyID) {
        try{
            var result = await cache.client.getAsync(companyID);

            return result;
        } catch (err) {
            console.log("companyCache - GetCompany: " + err);
        }
    },
    SaveCompany: async function (company) {
        try {
            await cache.client.setAsync(company._id, JSON.stringify(company));
        }
        catch (err) {
            console.log("companyCache-SaveCompany: " + err);
        }
    }
}