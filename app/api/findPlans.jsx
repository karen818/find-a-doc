var axios = require('axios');
var FindADocForm = require('FindADocForm');
var findFips = require('findFips');
var _ = require('lodash');


const KIND_HEALTH_GETPLANS_URL = 'http://api.kindhealth.co/findPlans/';
const MARKET = "individual";

module.exports = {
  getPlans: function(zipCode, fipsCode){
    return axios.post(KIND_HEALTH_GETPLANS_URL, {
      zip_code: zipCode,
      fips_code: fipsCode,
      market: MARKET
    }).then(function(res){
      var plansArray = [];
      var plansResponse = res.data.plans;
      plansResponse.forEach(function(plan){
        plansArray.push(plan);
      });

      var carriers = [];

      for (var i = 0; i < plansArray.length; i++) {
        carriers.push ({
          carrierName: plansArray[i].carrier_name,
          hiosIssuerId: plansArray[i].hios_issuer_id,
          planName: plansArray[i].name
        });
      };
      // carriers is now an array of objects

      var plansByCarrier = _.groupBy(carriers, function(n){
        return n.carrierName;
      });

      //plansByCarrier is now an object of carriers/plans


      return plansByCarrier;
    }).catch(function(err){
      console.log(err);
    });
  }
};
