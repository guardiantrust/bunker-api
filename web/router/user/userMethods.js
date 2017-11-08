var userDS = require("../../../data/documents/userDataSource");
var userEvent = require('../../../data/events/userEvents');
//var companyCache = require("../../../data/cache/companyCache");
var env = require("../../../config/index");
var User = require("../../../app/models/user");

module.exports = {
    CreateUser: async function(user) {
        try {
            let createdUser = await userDS.CreateUser(user);
            userEvent.CreateUser(createdUser.userID);
            return createdUser;
        } catch(err) {
            console.log("Error in userMethods - CreateUser :" + err);
        }
    },
    DeleteUser: async function(userID) {
        try {
            await userDS.DeleteUser(userID);
        } catch(err) {
            console.log("Error in userMethods - DeleteUser :" + err);
        }
    },
    GetUser: async function(userID) {
        try{
            let user = await userDS.GetUser(userID);
            return user;
        } catch(err) {
            console.log("Error in userMethods - GetUser :" + err);
        }
    },
    UpdateUser: async function(user) {
        try {
            await userDS.UpdateUser(user);
        } catch(err) {
            console.log("Error in userMethods - UpdateUser :" + err);
        }
    }
}