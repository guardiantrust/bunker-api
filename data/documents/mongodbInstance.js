var mongoose = require('mongoose');
var env = require('../../config/index');

mongoose.connect(env.db_connection, function(err){
    if(err){
        //console.log(env);
        console.log("Error with mongodb connection: " +err);
    }
});

mongoose.connection.on('connected', function() {
    console.log("DB Connected");
});

module.exports = exports = mongoose;