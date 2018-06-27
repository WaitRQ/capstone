const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://images.pexels.com/photos/279166/pexels-photo-279166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },

  latitude: {
    type: Sequelize.FLOAT,
    validate: {
      min: -90,
      max: 90
    }
  },

  longitude: {
    type: Sequelize.FLOAT,
    validate: {
      min: -180,
      max: 180
    }
  }
})

module.exports = Location
