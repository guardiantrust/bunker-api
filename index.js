var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var mongoose    = require('mongoose');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var loginUser   = require('./app/models/login'); // get our mongoose model

var config = require('./config'); // get our config file
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey  = 'babyGOTback{|}';
var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
    console.log('payload received', jwt_payload);
    var user = loginUser.findById(jwt_payload.id);

    if(user){
        console.log('user found');
        next(null, user);
    } else {
        console.log('user not found');
        next(null, false);
    }

});
mongoose.connect(config.database); // connect to database
passport.use(strategy);

var app = express();
app.use(passport.initialize());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.json({message: "Express is up!"});
    console.log("get requested");
});

app.post("/login", function(req, res){
console.log(req.body.name);

    if ( req.body.name && req.body.password){
        var name = req.body.name;
        var password = req.body.password;
    }

    var user = loginUser.findOne({'userName': name});
    if(! user) {
        res.status(401).json({message: "no such user found"});
    }

    if(user.password === req.body.password) {
        var payload = {id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message: "ok", token: token});
    } else {
        res.status(401).json({message: "password did not match"});
    }
});

app.post("/loginUser", function(req, res){
    if(req.body.username && req.body.password){
        var username = req.body.username;
        var password = req.body.password;
    }
    console.log(username);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(){
        console.log("Connected");
    })

        loginUser.findOne({'userName': username}, function(err, res){
            if(err){
                console.log("Error finding user");
            }else{
                if(res ){
                    console.log(res.password);
                    res.statusCOde = 200;
                    return;
                }
            }
        });

        var user = new loginUser({userName: username, password: password, lastLogin: Date.now()});
        user.save(function (err, user) {
            console.log("save user");
            if(err) console.log(err);
            console.log(user.password);

        });

res.send(200);
    
});

app.listen(9010, function() {
    console.log("Express running");
});