const {models} = require('../model');
const Joi = require('joi');
const moment = require("moment");
const { Op } = require("sequelize");

/**
 * function: saveObject
 * task: Saving key value object to database with proper validation
 */
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
      // Save key value to database
      models.keyValue.create({
        key: data.key,
        value: data.value,
        timestamp: moment().utc().format(),
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

/**
 * function: getObjectByKey
 * task: Gets an object by the key provided in parameter.
 * Also returns an object matching the timestamp given in query string
 */
exports.getObjectByKey = (req, res)=>{
  const key = req.params.key
  let timestamp = req.query.timestamp
  // Validate if any key was provided
  if(key){
    let where = {
      key: key
    }
    // If timestamp was provided with that key, return data matching that timestamp
    if(timestamp){
      if (moment(timestamp, 'x', true).isValid()) { //Validate timestamp provided in the query
        timestamp = moment
          .unix(timestamp)
          .utc()
          .toDate();
        where = {
          ...where,
          timestamp: {
            [Op.lte]: timestamp
          }
        };
      } else {
        return res.status(422).json({
          status: "error",
          message: "Invalid request with invalid timestamp",
          data: null
        });
      }
    }
    models.keyValue.findOne({
      where: where,
      order: [["timestamp", 'DESC']],
    }).then(keyValue=>{
      res.status(200).json({
        status: "success",
        message: "Found data",
        data: keyValue
      });
    })
  } else {
    res.status(422).json({
      status: "error",
      message: "Invalid request with no key in parameter",
      data: null
    });
  }
}