var companyDS = require("../../../data/documents/companyDataSource");
//var authEvent = require('../../../data/events/authEvent');
var companyCache = require("../../../data/cache/companyCache");
var env = require("../../../config/index");
var Company = require("../../../app/models/company");

module.exports = {
    GetCompany: async function (companyID) {
        try {
            var company = await companyDS.GetCompany(companyID);
            if (!company) {
                console.log("could not find Cusotmer by ID: " + companyID);
            }
            return company;
        } catch (err) {
            console.error("Error in companyMethods - GetCompany: " + err);
        }
    },
    GetCompanies: async function () {
        try {

        } catch (err) {

        }

    },
    CreateCompany: async function (company) {
        try {
            await companyDS.SaveCompany(company);

        } catch (err) {
            console.error("Error in cmpanyMethods - CreateCompany: " + err);
        }
    }
}