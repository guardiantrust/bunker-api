var mongoose = require("../documents/mongodbInstance");
var User = require("../../app/models/user");

module.exports = {
    GetUser: async function(userID) {
        try {
            let user = await User.findById(userID);

            return user;
        } catch (err) {
            console.log('Could not find USER: ' + err);
        }
    },
    CreateUser: async function(user) {
        try {
            await user.save(function (err) {
            });

            return user;

        } catch (err) {
            console.error("Error in userDataSource - CreateUser: " + err);
        }
    },
    UpdateUser: async function(user) {
        try {
            await Machine.findOneAndUpdate({ _id: user.userID }, 
                { $set: { firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber, sMS: user.sMs, isActive: user.isActive } });
        } catch (err) {
            console.error("Error in userDataSource - UpdateUser: " + err);
        }
        
    },
    DeleteUser: async function(userID) {
        try {
            await User.findByIdAndUpdate(userID, { "isActive": false });
        } catch (err) {
            console.error("Error in userDataSource - DeleteUser: " + err);
        }
    }

}