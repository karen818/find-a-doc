var axios = require('axios');
var FindADocForm = require('FindADocForm');

const KIND_HEALTH_GETFIPS_URL = 'http://api.kindhealth.co/getZipCounties/';

// fcd81178da8bd33a003f4c51d5cb2fe6

module.exports = {
  getFipsCode: function(zip){

    return axios.get(KIND_HEALTH_GETFIPS_URL + zip).then(function(res){
      var returnedFipsCode = res.data.counties[0].fips_code;
      return returnedFipsCode;
    }, function(res){
      throw new Error(res.data.message);
    });
  }
};
