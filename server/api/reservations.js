const router = require('express').Router()
const {Reservation, Message} = require('../db/models') ///replace this if named differently
const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = router

// get all open reservations
router.get('/', async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll({
      include: [{all: true}]
    })
    res.json(reservations)
  } catch (err) {
    next(err)
  }
})

// get reservations by userId
// all reservations related to me
// as a buyer having others waiting in the line for me
// or as a seller waiting in the line for others
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
      await Message.create({
        reservationId: reservation.id,
        text: 'New Reservation Created!'
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
    await Reservation.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    const fullRes = await Reservation.findOne({
      where: {id: req.params.id},
      include: [{all: true}]
    })
    console.log('this is the full res', fullRes.dataValues)
    res.json(fullRes.dataValues)
  } catch (err) {
    next(err)
  }
})

// returning: true
// })
// res.json(reservation[1][0].dataValues)

//included other routes like an update post/put route
