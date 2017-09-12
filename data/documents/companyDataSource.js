var mongoose = require("../documents/mongodbInstance");
var Company = require("../../app/models/company");
module.exports = {
    GetCompany: async function (companyID) {
        try {
            let c = await Company.findById(companyID);

            return c;

        } catch (err) {
            console.error("Error in companyDataSource - GetCompany: " + err);
        }
    },
    GetCompanies: async function () {
        try {
            let companies = await Company.find();
            return companies;

        } catch (err) {
            console.error("Error in companyDataSource - GetCompanies: " + err);
        }
    },
    SaveCompany: async function (company) {
        try {
            await company.save(function (err) {

            });

            return company;

        } catch (err) {
            console.error("Error in companyDataSource - SaveCompany: " + err);
        }
    },
    DeleteCompany: async function (companyID) {
        try {
            await Company.findByIdAndUpdate(companyID, { "isActive": false });
        }
        catch (err) {

        }
    }

}
