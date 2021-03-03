'use strict'
const express = require('express')
const router = express.Router()
const errors = require('../middlewares/error-handler')
const subscribeController = require('../controllers/publisher.controller')
const validation = require('../middlewares/validation')
const subscriptionSchema = require('../validations/subscription.validation')

router.post('/subscribe/:topic', validation(subscriptionSchema.subscribe, 'body'), subscribeController.subscribeToTopic)
router.post('/publish/:topic', subscribeController.publishToTopic)

router.use(errors.handleNotFound)
module.exports = router








