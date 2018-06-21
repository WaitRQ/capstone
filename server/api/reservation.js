const router = require('express').Router()
const {Reservation} = require('../db/models') ///replace this if named differently
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll()
    res.json(reservations)
  } catch (err) {
    next(err)
  }
})

//included other routes like an update post/put route
