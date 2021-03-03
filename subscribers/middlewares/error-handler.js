'use strict'

const httpStatus = require('http-status')

// hanlde not found error
exports.handleNotFound = (_req, res) => {
  res.status(httpStatus.NOT_FOUND)
  res.json({
    status: 404,
    message: 'Requested resource not found'
  })
  res.end()
}

// handle errors
exports.handleError = (err, _req, res) => {
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR)
  res.json({
    message: err.message,
    extra: err.extra,
    errors: err
  })
  res.end()
}
