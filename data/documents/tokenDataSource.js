var mongoose = require("../documents/mongodbInstance");
var Token = require("../../app/models/token");

module.exports = {
    GetToken: async function (userID) {
        try {
            var token = await Token.findOne({ 'userID': userID });
            return token;
        } catch (err) {
            console.log('Error in tokenDataSource - GetToken: ' + err);
        }
    },
    SaveToken: async function (tokenData) {
        try {
            
            tokenData.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
        catch (err) {
            console.log('Error in tokenDataSource - SaveToken : ' + err);
        }
    },
    DeleteToken: async function(userID) {
        try {
            Token.find({'userID': userID}).remove().exec();
        } catch (err) {
            console.log('Error in tokenDataSource - DeleteToken: ' + err);
        }
    }
}