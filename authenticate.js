// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwtStrategy    = require('passport-jwt').Strategy; // used to create, sign, and verify tokens
var extractJWT = require('passport-jwt').ExtractJwt;

var opts = {}
opts.jwsFromRequest = extractJWT.fromAuthHeader();
opts.secret = 'babysGOTback{|}';
opts.issuer = 'bunker.com';
passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id : jwt_payload.sub}, function(err, user){
        if(err) {
            return done(err, false);
        }
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    })
}));
var config = require('./config'); // get our config file
var User   = require('./app/models/login'); // get our mongoose model

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// API ROUTES -------------------
// we'll get to these in a second

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);