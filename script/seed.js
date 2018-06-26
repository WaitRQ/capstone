'use strict'

const db = require('../server/db')
const {
  User,
  Location,
  Reservation,
  Message,
  Status
} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({
      name: 'Cody',
      imageUrl:
        'https://s.yimg.com/ny/api/res/1.2/rEOFkdkJf3IjLi1_3t_syQ--/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9MjUwO2g9MjAwO2lsPXBsYW5l/http://media.zenfs.com/en-US/blogs/ept_prod/ymoviesblog-617027335-1305843351.jpg',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      name: 'Murphy',
      imageUrl:
        'https://blanklabel.blob.core.windows.net/placementshots/rubenstein-web-a.jpg',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const locations = await Promise.all([
    Location.create({
      name: 'Apple Soho',
      imageUrl: 'https://media.timeout.com/images/100520009/630/472/image.jpg',
      address: '103 Prince Street, New York',
      latitude: 40.725058,
      longtitude: -73.999037
    }),
    Location.create({
      name: 'The Rink At Rockefeller Center',
      imageUrl:
        'http://blog.dreamhotels.com/wp-content/uploads/2014/10/TheRink.jpg',
      address: '600 5th Ave, New York',
      latitude: 40.7592592,
      longtitude: -73.9782257
    })
  ])

  const statuses = await Promise.all([
    Status.create({
      type: 'unpaid'
    }),
    Status.create({
      type: 'paid'
    }),
    Status.create({
      type: 'confirmed'
    }),
    Status.create({
      type: 'canceled'
    }),
    Status.create({
      type: 'completed'
    })
  ])

  const reservations = await Promise.all([
    Reservation.create({
      sellerId: users[0].id,
      locationId: locations[0].id,
      status: statuses[0].id,
      price: 25.5,
      buyerId: users[1].id
    }),
    Reservation.create({
      sellerId: users[1].id,
      locationId: locations[1].id,
      status: statuses[2].id,
      price: 10.8,
      buyerId: users[0].id
    })
  ])

  const messages = await await Promise.all([
    Message.create({
      reservationId: reservations[0].id,
      fromId: reservations[0].sellerId,
      toId: reservations[0].buyerId,
      text:
        'hey, lines moving slower, i will text you when i am closer in an hour'
    }),
    Message.create({
      reservationId: reservations[1].id,
      fromId: reservations[1].sellerId,
      toId: reservations[1].buyerId,
      text: 'hey, lines moving fast, you may come now!'
    })
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${locations.length} locations`)
  console.log(`seeded ${statuses.length} statuses`)
  console.log(`seeded ${reservations.length} reservations`)
  console.log(`seeded ${messages.length} messages`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
