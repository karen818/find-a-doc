'use strict'

const schemas = require('./app/data/schemas');
const mockapi = require('./app/data/mockapi');

module.exports = (app, api) =>{

  app.post('/findPlans', (req, res) => {

    req.validate(schemas.findPlans_schema)
    let errors = req.validationErrors()
    if(errors){
      res.status(400).json(errors)
    }
    else{
      res.status(200).json(mockapi.findPlans())
    }

  })

  app.post('/findProviders', (req, res) => {

    req.validate(schemas.findProviders_schema)
    let errors = req.validationErrors()
    if(errors){
      res.status(400).json(errors)
    }
    else{
      res.status(200).json(mockapi.findProviders())
    }

  })

  app.get('/getZipCounties/:zip_code', (req, res) => {

    req.validate(schemas.getZipCounties_schema)
    let errors = req.validationErrors()
    if(errors){
      res.status(400).json(errors)
    }
    else{
      res.status(200).json(mockapi.getZipCounties())
    }
  })


}
