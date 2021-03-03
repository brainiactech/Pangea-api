'use strict'
const express = require('express')
const router = express.Router()
const errors = require('../middlewares/error-handler')
const subscribeController = require('../controllers/subscription.controller')

router.post('/test1', subscribeController.callback)
router.post('/test2', subscribeController.callback)

router.use(errors.handleNotFound)
module.exports = router








