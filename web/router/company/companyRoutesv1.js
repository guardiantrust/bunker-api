var express = require('express');
var router = express.Router();
var date = require('time');
var Company = require('../../../app/models/company');
var companyMethods = require('./companyMethods');


// company GET request
router.get('/:companyID', function (req, res) {
    try {

        var id = req.params.companyID;

        companyMethods.GetCompany(id).then(function (company) {
            if (company) {
                res.status(200).send(company);
            } else {

                res.status(401).send();
            }
        });


    } catch (err) {
        console.log("Error in getting Company by Id - " + err);
        res.status(401).send();
    }
});

router.get('/', function (req, res) {
    try {
        companyMethods.GetCompanies().then(function (companies) {
            if (companies) {
                res.status(200).send(companies);
            }
            else {
                res.status(401).send();
            }
        });
    }
    catch (err) {
        console.log("Error in getting Companies - " + err);
        res.status(500).send();
    }
});

router.delete('/:companyID', function (req, res){
    try{
        var id = req.params.companyID;
        
        companyMethods.InactivateCompany(id).then(function () {
            res.status(200).send();
        });
        
    } catch(err)
    {
        console.error("Error deleting Company:" + err);
        res.status(500).send();
    }
});

router.post('/', function (req, res) {
    try {
        // create company schema
        if (req.body) {
            var reqBody = req.body;
            var created = date.Date();
            var company = new Company({
                name: reqBody.name,
                address1: reqBody.address1,
                address2: reqBody.address2,
                city: reqBody.city,
                state: reqBody.state,
                zipCode: reqBody.zipCode,
                postal: reqBody.postal,
                contactEmail: reqBody.contactEmail,
                phoneNumber: reqBody.phoneNumber,
                created: created,
                isActive: true,
                isSuspended: false
            });
            // Save Comapny
            companyMethods.CreateCompany(company);
            // send response
            res.status(200).send(company._id.toString());
        } else {
            res.status(401).send();
        }
    } catch (err) {
        console.log("Error in Creating Company: " + err);
        res.sendStatus(500).send();
    }
}); 

module.exports = router;