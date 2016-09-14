var axios = require('axios');
var FindADocForm = require('FindADocForm');
var findFips = require('findFips');

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
      var plansRes = res.data.plans;
      plansRes.forEach(function(plan){
        plansArray.push(plan);
      });

      var carriers = [];
      for (var i = 0; i < plansArray.length; i++) {
        carriers.push (plansArray[i].carrier_name, plansArray[i].hios_issuer_id, plansArray[i].name);
      };
      console.log(carriers);



      return plansArray;
    }).catch(function(err){
      console.log(err);
    });
  }
};
