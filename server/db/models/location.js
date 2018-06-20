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
      'https://www.imore.com/sites/imore.com/files/styles/xlarge/public/field/image/2015/02/apple-store-west-lake-front-press.jpg?itok=l6uTaHOH'
  },

  latitude: {
    type: Sequelize.FLOAT,
    validate: {
      min: -90,
      max: 90
    }
  },

  longtitude: {
    type: Sequelize.FLOAT,
    validate: {
      min: -180,
      max: 180
    }
  }
})

module.exports = Location
