const {models} = require('../model');
const Joi = require('joi');
const moment = require("moment");

exports.saveObject = (req, res)=>{
  const data = req.body;
  // Validate our database schema with Joi
  const schema = Joi.object().keys({
    key: Joi.string().required(),
    value: Joi.object(),
  })
  Joi.validate(data, schema, (err, value)=>{
    if(err){
      // send a 422 error response if validation fails
      res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: data
      });
    } else {
      models.keyValue.create({
        key: data.key,
        value: data.value,
      }).then(keyValue=>{
        res.status(200).json({
          status: 'success',
          message: 'Successfully saved data',
          data: keyValue.get({ plain:true })
        })
      })
    }
  })
}