var express = require('express');
var router = express.Router();

var companyRoutesV1 = require('./company/companyRoutesv1');


router.use('/companies',companyRoutesV1);

module.exports = router;

