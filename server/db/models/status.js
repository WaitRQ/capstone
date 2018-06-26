const Sequelize = require('sequelize')
const db = require('../db')

const Status = db.define('status', {
  type: {
    type: Sequelize.STRING
  }
})

module.exports = Status
