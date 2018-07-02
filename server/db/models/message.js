const Sequelize = require('sequelize')
const db = require('../db')
const {User} = require('../models')

const Message = db.define('message', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Message.getMessagesByReservationId = function(reservationId) {
  return this.findAll({
    where: {
      reservationId
    },
    order: [['createdAt']],
    include: [
      {
        model: User,
        as: 'from'
      }
    ]
  })
}

Message.getMessageById = function(messageId) {
  return this.findOne({
    where: {id: messageId},
    include: [
      {
        model: User,
        as: 'from'
      }
    ]
  })
}

module.exports = Message
