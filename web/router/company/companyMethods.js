var companyDS = require("../../../data/documents/companyDataSource");
//var authEvent = require('../../../data/events/authEvent');
var companyCache = require("../../../data/cache/companyCache");
var env = require("../../../config/index");
var Company = require("../../../app/models/company");

module.exports = {
    GetCompany: async function (companyID) {
        try {
            //Check cache
            companyCache.GetCompany(companyID);
            let company = await companyDS.GetCompany(companyID);

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
            let companies = await companyDS.GetCompanies();

            if (!companies) {
                console.log("Could not find any companies - ");
            }
            return companies;
        } catch (err) {
            console.error("Error in companyMethods - GetCompanies: " + err);
        }

    },
    CreateCompany: async function (company) {
        try {

            var c = await companyDS.SaveCompany(company);

            companyCache.SaveCompany(c);

        } catch (err) {
            console.error("Error in cmpanyMethods - CreateCompany: " + err);
        }
    },
    InactivateCompany: async function (companyID) {
        try {
            await companyDS.DeleteCompany(companyID);
        }
        catch (err) {
            console.error("Error in companyMethods - InactivateCompany: " + err);
        }
    }
}