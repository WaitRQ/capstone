const router = require('express').Router()
const {Location} = require('../db/models') ///replace this if named differently
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const locations = await Location.findAll()
    res.json(locations)
  } catch (err) {
    next(err)
  }
})

//included other routes like an update post/put route
