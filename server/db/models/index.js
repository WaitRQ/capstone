const User = require('./user')
const Location = require('./location')
const Reservation = require('./reservation')
const Message = require('./message')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Reservation.belongsTo(User)
User.hasMany(Reservation)

Reservation.belongsTo(Location)
Location.hasMany(Reservation)

Reservation.belongsTo(User, {as: 'client'})
User.hasMany(Reservation, {as: 'client'})

Message.belongsTo(Reservation)
Reservation.hasMany(Message)

Message.belongsTo(User, {as: 'from'})
Message.belongsTo(User, {as: 'to'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Location,
  Reservation,
  Message
}
