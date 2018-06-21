const router = require('express').Router()
const {Message} = require('../db/models') ///replace this if named differently
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll()
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

//Get message by ID? think we need get all messages by reservation ID?

router.post('/', async (req, res, next) => {
  try {
    const message = await Message.create(req.body)
    res.json(message)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const message = await Message.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.json(message[1][0].dataValues)
  } catch (err) {
    next(err)
  }
})

//included other routes like an update post/put route
