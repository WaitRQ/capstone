const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/locations', require('./locations'))
router.use('/reservations', require('./reservations'))
router.use('/messages', require('./messages'))
router.use('/twilio', require('./twilio'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
