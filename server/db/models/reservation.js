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
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Date.now()
  }, //date of reservation
  time: {
    type: Sequelize.TIME,
    defaultValue: '09:00'
  } //time of reservation
})

module.exports = Reservation
