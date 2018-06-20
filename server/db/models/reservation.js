const Sequelize = require('sequelize')
const db = require('../db')

const Reservation = db.define('reservation', {
  paid: {
    type: Sequelize.NUMERIC(10, 2),
    defaultValue: 0
  },
  amountOwed: {
    type: Sequelize.NUMERIC(10, 2),
    defaultValue: 0
  },
  status: {
    type: Sequelize.ENUM('new', 'pending', 'paid', 'canceled', 'completed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  }
})

module.exports = Reservation
