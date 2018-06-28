const router = require('express').Router()
const {Reservation} = require('../db/models') ///replace this if named differently
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll({include: [{all: true}]})
    res.json(reservations)
  } catch (err) {
    next(err)
  }
})

//get reservations by userId
router.get('/user/:userId', async (req, res, next) => {
  console.log('cqy is a pig', req.params.userId)
  try {
    const reservations = await Reservation.getReservationsByUserId(
      req.params.userId
    )
    res.json(reservations)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const reservation = await Reservation.create(req.body)
    res.json(reservation)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const reservation = await Reservation.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.json(reservation[1][0].dataValues)
  } catch (err) {
    next(err)
  }
})

//included other routes like an update post/put route
