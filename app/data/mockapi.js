'use strict'
const zipCountiesResponse = require('./zipCountiesResponse')
const findProvidersResponse = require('./findProvidersResponse')
const findPlansResponse = require('./findPlansResponse')


module.exports ={
  getZipCounties: () => {
    return zipCountiesResponse()
  },

  findProviders: () => {
    return findProvidersResponse()
  },

  findPlans: () => {
    return findPlansResponse()
  }

}
