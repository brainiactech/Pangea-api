'use strict'

const Joi = require('joi')

module.exports = {
    subscribe: Joi.object({
      url: Joi.string().uri().required()
    })
}
