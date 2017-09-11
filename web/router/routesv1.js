var express = require('express');
var router = express.Router();

var companyRoutesV1 = require('./company/companyRoutesv1');

router.use(function(req, res, next) {

    var token = req.headers['x-access-token'];

    if (token) {
        next();
    } else {
        return res.status(403).send(P {
            success: false,
            message: 'No token provided.'
        });
    }

});

router.use('/companies', companyRoutesV1);

module.exports = router;