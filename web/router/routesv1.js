var express = require('express');
var router = express.Router();
var authMethods = require('./authentication/tokenMethods');
var companyRoutesV1 = require('./company/companyRoutesv1');
var machineRoutesV1 = require('./machine/machineRoutesV1');
var userRoutesV1 = require('./user/userRoutesV1');

router.use('/companies', authMethods.AuthenticateToken, companyRoutesV1);
router.use('/machines', authMethods.AuthenticateToken, machineRoutesV1);
router.use('/users', authMethods.AuthenticateToken, userRoutesV1);
module.exports = router;