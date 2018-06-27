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

//get my reservations where I'm a buyer
router.get('/buyer/:userId', async (req, res, next) => {
  try {
    const reservations = await Reservation.getReservationsAsBuyerByUserId(
      req.params.userId
    )
    res.json(reservations)
  } catch (error) {
    next(error)
  }
})

//get my reservations where I'm a seller
router.get('/seller/:userId', async (req, res, next) => {
  try {
    const reservations = await Reservation.getReservationsAsSellerByUserId(
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
