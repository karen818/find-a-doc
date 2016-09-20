var axios = require('axios');
var FindADocForm = require('FindADocForm');
var FindADoc = require('FindADoc');
var findPlans = require('findPlans');
var _ = require('lodash');


const KIND_HEALTH_GETPLANS_URL = 'http://api.kindhealth.co/findProviders/';
const MARKET = "individual";

module.exports = {
  getProviders: function (zip, array) {
    return axios.post(KIND_HEALTH_GETPLANS_URL, {
      zip_code: zip,
      hios_ids: array,
      radius: '15',
      type: MARKET
    }).then(function (res) {

      var providersResponse = res.data.providers;

      var providersList = [];

      for (var i = 0; i < providersResponse.length; i++) {
        if(providersResponse[i].accepting_change_of_payor_patients === true ||
           providersResponse[i].accepting_medicaid_patients === true ||
           providersResponse[i].accepting_medicare_patients === true ||
           providersResponse[i].accepting_private_patients === true ||
           providersResponse[i].accepting_referral_patients === true
         ){
           providersList.push({
             providerName: providersResponse[i].presentation_name,
             providerStreet1: providersResponse[i].street_line_1,
             providerStreet2: providersResponse[i].street_line_2,
             providerCity: providersResponse[i].city,
             providerSpecialty: providersResponse[i].specialty,
             providerZip: providersResponse[i].zip_code,
             providerId: providersResponse[i].id,
             acceptPayorChange: providersResponse[i].accepting_change_of_payor_patients,
             acceptMedicaid: providersResponse[i].accepting_medicaid_patients,
             acceptMedicare: providersResponse[i].accepting_medicare_patients,
             acceptPrivate: providersResponse[i].accepting_private_patients,
             acceptReferral: providersResponse[i].accepting_referral_patients
           });
         }
      };

      return providersList;

    }).catch(function (err) {
      console.log(err);
    });
  },
  filterProviders: function(providersList, searchText){
    var filteredProviders = Array.from(providersList);

    filteredProviders = filteredProviders.filter((provider) => {
      var name = provider.provName.toLowerCase();
      var specialty = provider.provSpecialty.toLowerCase();
      return searchText.length === 0 || name.indexOf(searchText) > -1 || specialty.indexOf(searchText) > -1;
    });

    return filteredProviders;

  }
};
