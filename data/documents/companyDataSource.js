var mongoose = require("../documents/mongodbInstance");
var Company = require("../../app/models/company");
module.exports = {
    GetCompany: async function (companyID) {
        try {
            var customer = await Company.findById(companyID);
            if(!customer){
                console.log("Could not find Company by ID: " + companyID );
            }
            return customer;
        } catch (err) {
            console.error("Error in companyDataSource - GetCompany: " + err);
        }
    },
    GetCompanies: async function () {
        try {
            var companies = await Company.find();
            return companies;
        } catch (err) {
            console.error("Error in companyDataSource - GetCompanies: " + err);
        }
    },
    SaveCompany: async function (company) {
        try {
            company.save();
        } catch (err) {
            console.error("Error in companyDataSource - SaveCompany: " + err);
        }
    },
    DeleteCompany: async function (customerID) {
        try{
            await Company.findByIdAndUpdate(companyID, {"isActive" : false});
        }
        catch(err) {

        }
    }

}
