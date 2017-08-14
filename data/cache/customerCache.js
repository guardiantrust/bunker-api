var cache = require('./redisCache');
var stringify = require('json-stringify');

module.exports = {
    GetCustomer: async function (customerID) {
        try{
            var result = await cache.client.getAsync(customerID);

            return result;
        } catch (err) {
            console.log("customerCache - GetCustomer: " + err);
        }
    },
    SaveCustomer: async function (customer) {
        try {
            await cache.client.setAsync(customer._id, JSON.stringify(customer));
        }
        catch (err) {
            console.log("customerCach-SaveCustomer: " + err);
        }
    }
}