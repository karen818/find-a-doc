var axios = require('axios');
var FindADocForm = require('FindADocForm');

const KIND_HEALTH_GETFIPS_URL = 'http://api.kindhealth.co/getZipCounties/';

// fcd81178da8bd33a003f4c51d5cb2fe6

module.exports = {
  getZipFipsCode: function (zip) {

    return axios.get(KIND_HEALTH_GETFIPS_URL + zip).then(function (res) {

      // Some validation on the returned data
      if (!res.data.counties[0].fips_code || !res.data.zip_codes[0].code)
        return new Error("Something went wrong with the zip code")

      var resp_data = {
        fips_code: res.data.counties[0].fips_code,
        zip_code: res.data.zip_codes[0].code
      }

      return resp_data

    }, function (res) {
      throw new Error(res.data.message);
    });
  }
};
