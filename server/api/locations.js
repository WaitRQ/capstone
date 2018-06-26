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

router.post('/', async (req, res, next) => {
  try {
    const location = await Location.create(req.body)
    res.json(location)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const result = await Location.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.json(result[1][0].dataValues)
  } catch (err) {
    next(err)
  }
})

//included other routes like an update post/put route
