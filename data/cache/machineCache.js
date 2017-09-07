var cache = require('./redisCache');

module.exports = {
    GetMachine: async function (machineID) {
        try {
            var result = await cache.client.getAsync(machineID);

            if (!result) {
                console.log("authCache: Did not find user in cache!");
            }

            return result;
        }
        catch (err) {
            console.log("machineCache: " + err);
        }
    },
    AddMachine: async function (machine) {
        try {
            await cache.client.setAsync(machine.machineID, machine.toJSON());
        }
        catch (err) {
            console.log("machineCache - AddMachine: " + err);
        }
    },
    DeleteMachine: async function (machineID) {
        try{
            await cache.client.del(machineID);
        } catch (err) {
            console.log("machineCache - DeleteMachine: " + err);
        }
    }
}