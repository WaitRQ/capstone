const router = require('express').Router()
const {Reservation} = require('../db/models') ///replace this if named differently
const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll({
      where: {statusId: 1},
      include: [{all: true}]
    })
    res.json(reservations)
  } catch (err) {
    next(err)
  }
})

//get reservations by userId
router.get('/user/:userId', async (req, res, next) => {
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
    const stripeReturn = await stripe.charges.create(req.body.stripeObject)
    if (stripeReturn.status === 'succeeded') {
      const newReservation = req.body.reservation
      const reservation = await Reservation.create(newReservation)
      const fullRes = await Reservation.findOne({
        where: {id: reservation.id},
        include: [{all: true}]
      })
      res.json(fullRes.dataValues)
    } else {
      res.status(402).send('payment rejected')
    }
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
