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

//included other routes like an update post/put route
