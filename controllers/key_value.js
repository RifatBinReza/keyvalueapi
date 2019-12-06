const {models} = require('../model');
const Joi = require('joi');

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
      res.status(200).json({
        status: 'success',
      })
    }
  })
}