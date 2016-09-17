var axios = require('axios');
var FindADocForm = require('FindADocForm');
var findPlans = require('findPlans');
var _ = require('lodash');


const KIND_HEALTH_GETPLANS_URL = 'http://api.kindhealth.co/findProviders/';
const MARKET = "individual";

module.exports = {
  getProviders: function (hiosPlanId) {
    return axios.post(KIND_HEALTH_GETPLANS_URL, {
      id: hiosPlanId,
      market: MARKET
    }).then(function (res) {

      var providersResponse = res.data.plans;

      var providersArray = [];

      for (var i = 0; i < providersResponse.length; i++) {
        providersArray.push({
          providerName: providersResponse[i].presentation_name,
          providerPhone: providersResponse[i].phone,
          providerStreet1: providersResponse[i].street_line_1,
          providerStreet2: providersResponse[i].street_line_2,
          providerCity: providersResponse[i].city,
          providerZip: providersResponse[i].zip_code,
          providerId: providersResponse[i].id,
        });
      };
      console.log(providersArray);
      return providersArray;

    }).catch(function (err) {
      console.log(err);
    });
  }
};
