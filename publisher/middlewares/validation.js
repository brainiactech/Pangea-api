const Joi = require('joi')
const responseHandler = require('../helpers/responseHandler')
const validate = (schema, property) => {

  return (req, res, next) => {
    const {error} = Joi.validate(req[property], schema, {abortEarly: false, allowUnknown: true});
    const valid = error == null
    if (valid) {
      next()
    } else {
      const {details} = error
      const message = details.map(i => i.message && i.message.replace(/['"]/g, '').replace(/mongo/g, '')).join(' and ')
      return responseHandler.send(res, {success: false, message: message, data: {}}, 'OK', 'UNPROCESSABLE_ENTITY');
    }
  }
}
module.exports = validate;
