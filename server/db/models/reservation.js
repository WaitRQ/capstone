const Sequelize = require('sequelize')
const Op = Sequelize.Op
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

Reservation.getReservationsByUserId = function(userId) {
  return this.findAll({
    where: {[Op.or]: [{buyerId: userId}, {sellerId: userId}]},
    include: [{all: true}]
  })
}

module.exports = Reservation
