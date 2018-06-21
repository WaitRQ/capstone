const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

//uncomment new routes when ready

// router.use('/reservation', require('./reservation'))
// router.use('/location', require('./location'))
// router.use('/message', require('./message'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
