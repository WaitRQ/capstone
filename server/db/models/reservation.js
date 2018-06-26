const Sequelize = require('sequelize')
const db = require('../db')

const Reservation = db.define('reservation', {
  price: {
    type: Sequelize.FLOAT,
    get() {
      return this.getDataValue('price') / 100
    },
    set(val) {
      this.setDataValue('price', val * 100)
    }
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
