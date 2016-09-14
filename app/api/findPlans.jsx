var axios = require('axios');
var FindADocForm = require('FindADocForm');
var findFips = require('findFips');

const KIND_HEALTH_GETPLANS_URL = 'http://api.kindhealth.co/findPlans/';
const MARKET = "individual";

// fcd81178da8bd33a003f4c51d5cb2fe6

module.exports = {
  getPlans: function(zipCode, fipsCode){
    return axios.post(KIND_HEALTH_GETPLANS_URL, {
      zip_code: zipCode,
      fips_code: fipsCode,
      market: MARKET
    }).then(function(res){
      var plansArray = [];
      var plans = res.data.plans;
      plans.forEach(function(plan){
        plansArray.push(plan);
      });
      console.log(plansArray[0]);
      return plansArray;
    }).catch(function(err){
      console.log(err);
    });
  }
};
