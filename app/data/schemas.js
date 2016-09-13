'use strict'

module.exports = {

//using express_validator

  getZipCounties_schema : {
    'zip_code': {
      notEmpty: true,
      isInt: true,
      isLength: {
        options: [{ min: 5, max: 5 }],
        errorMessage: 'zip code must be 5 numbers' // Error message for the validator, takes precedent over parameter message
      }
    }
  }, // getZipCounties_schema

  findProviders_schema : {
    'zip_code': {
      notEmpty: {
        errorMessage: 'zip_code is required'
      },
      isInt: true,
      isLength: {
        options: [{ min: 5, max: 5 }],
        errorMessage: 'Length error: zip_code must be 5 numbers' // Error message for the validator, takes precedent over parameter message
      }
    },
    'hios_ids': {
      notEmpty: {
        errorMessage: 'hios_ids array is required. String array of "plan id"'
      },
      isArray: {
        errorMessage: 'must be array of strings: ex ["29418TX0160005"]'
      }
    },
    'type': {
      notEmpty: {
        errorMessage: 'type is required: individual or organization'
        }
    },
    'radius': {
      notEmpty: {
        errorMessage: 'radius is required, miles'
      },
      isInt: true
    }
  }, // findProviders_schema

  findPlans_schema: {
    'zip_code': {
      notEmpty: {
        errorMessage: 'zip_code is required'
      },
      isInt: {
        errorMessage: 'numbers only'
      },
      isLength: {
        options: [{ min: 5, max: 5 }],
        errorMessage: 'zip code must be 5 numbers'
      }
    },
    'fips_code': {
      notEmpty: {
        errorMessage: 'fips_code is required'
      },
      isInt: {
        errorMessage: 'numbers only'
      },
      isLength: {
        options: [{ min: 5, max: 5 }],
        errorMessage: 'fips_code must be 5 numbers'
      }
    },
    'market': {
      notEmpty: {
        errorMessage: 'market is required: individual'
      },
    },
    'household_size': {
      optional: true,
      isInt: {
        errorMessage: 'numbers only'
      }
    },
    'household_income': {
      optional: true,
      isInt: {
        errorMessage: 'numbers only'
      }
    },
    'applicants': {
      optional: true,
      isArray: {
        errorMessage: 'must be array [{age, smoker}]'
      }
    }
  } // findPlans_schema

}
