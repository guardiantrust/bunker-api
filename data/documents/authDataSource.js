var mongoose = require('mongoose');
var cache = require('redis');
var Login = require('../../models/authentication/login');
var cache = require('../cache/redisCache');


var exports = module.exports;
 exports.ValidateLogin = function(login, callback){
    // validate values
    if(!login.userName || !login.password){
        callback(new Error('Login credentials not complete!'), false);
        return;
    }

    //check cache for user info
    cache.client.getAsync(login.userName).then(function(res){
        if(res){
            callback(null, true);
            return;
        }
    });

    var query = Login.findOne({userName: login.userName});
    query.then(function(result){
        if(result){
            callback(null, false);
            return;
        }
    });

    callback(null, false);
};




