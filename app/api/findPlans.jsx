var axios = require('axios');
var FindADocForm = require('FindADocForm');
var findFips = require('findFips');

var _ = require('lodash');


const KIND_HEALTH_GETPLANS_URL = 'http://api.kindhealth.co/findPlans/';
const MARKET = "individual";

module.exports = {
  getPlans: function (zipCode, fipsCode) {
    return axios.post(KIND_HEALTH_GETPLANS_URL, {
      zip_code: zipCode,
      fips_code: fipsCode,
      market: MARKET
    }).then(function (res) {

      var plansResponse = res.data.plans;

      var plansArray = [];

      for (var i = 0; i < plansResponse.length; i++) {
        plansArray.push({
          carrierName: plansResponse[i].carrier_name,
          hiosIssuerId: plansResponse[i].hios_issuer_id,
          hiosPlanId: plansResponse[i].id, // This needs to be passed to the provider search
          planName: plansResponse[i].name
        });
      };
      return plansArray;

    }).catch(function (err) {
      alert('The zip code entered returned no results. Please try again.')
      console.log(err);
    });
  }
};
