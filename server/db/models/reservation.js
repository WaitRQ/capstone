const Sequelize = require('sequelize')
const db = require('../db')
const Location = require('./location')
const User = require('./user')

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

Reservation.getReservationsAsBuyerByUserId = function(userId) {
  return this.findAll({
    where: {buyerId: userId},
    include: [
      {
        model: User,
        as: 'buyer'
      },
      {
        model: Location
      }
    ]
  })
}

Reservation.getReservationsAsBuyerBySellerId = function(userId) {
  return this.findAll({where: {sellerId: userId}, include: [Location]})
}

module.exports = Reservation
