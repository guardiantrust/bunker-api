var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    }));

app.use(bodyParser.json());

app.use('/api/v1/', require('./router/routesv1'));
app.use('/auth', require('./router/authentication/tokenRoutesv1'));



app.listen(5000, function() {
    console.log("Express running");
});