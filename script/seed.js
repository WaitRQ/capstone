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
    }),
    Location.create({
      name: 'Ippudo West Side',
      imageUrl:
        'https://images.pexels.com/photos/698549/pexels-photo-698549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      address: '321 W 51st St, New York',
      latitude: '40.763491',
      longtitude: '-73.986586'
    }),
    Location.create({
      name: 'Hamilton the Musical',
      imageUrl:
        'https://images.pexels.com/photos/1089194/pexels-photo-1089194.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      address: '226 W 46th St, New York,',
      latitude: '40.759017',
      longtitude: '-73.986698'
    }),
    Location.create({
      name: ' The Cloisters',
      imageUrl:
        'https://images.pexels.com/photos/51381/baroque-church-collegiate-church-church-melk-51381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      address: '99 Margaret Corbin Dr, New York,',
      latitude: '40.864863',
      longtitude: '-73.931727'
    }),
    Location.create({
      name: ' The Metropolitan Museum of Art',
      imageUrl:
        'https://images.pexels.com/photos/34633/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      address: '1000 5th Ave, New York,',
      latitude: '40.779437',
      longtitude: '-73.963244'
    }),
    Location.create({
      name: ' Wicked',
      imageUrl:
        'https://images.pexels.com/photos/1120872/pexels-photo-1120872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      address: '222 W 51st St, New York,',
      latitude: '40.759017',
      longtitude: '-73.986698'
    }),
    Location.create({
      name: ' Best Buy',
      imageUrl:
        'https://i2.wp.com/digiday.com/wp-content/uploads/2017/07/Best-Buy.jpg?fit=1440%2C600&ssl=1',
      address: '529 5th Ave, New York,',
      latitude: '40.754411',
      longtitude: '-73.979698'
    }),
    Location.create({
      name: ' The Standard, High Line',
      imageUrl:
        'https://cdn.vox-cdn.com/thumbor/2ClGGQamLrgWoHX3IgKdo-8NMPg=/0x0:3000x2002/1200x800/filters:focal(1495x466:1975x946)/cdn.vox-cdn.com/uploads/chorus_image/image/50934721/533124666.0.jpg',
      address: '48 Washington Stree, New York,',
      latitude: '40.740923',
      longtitude: '-74.008111'
    }),
    Location.create({
      name: ' Fullstack Academy of Code',
      imageUrl:
        'https://www.launchacademy.com/assets/home-hero-2-d173fc2af4966d5d532899bb64235c1af2d3a8eaf6d90a5b234437ae1fc3ea84.png',
      address: '5 Hanover Sq, New York,',
      latitude: '40.705076',
      longtitude: '-74.009160'
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
      statusId: statuses[0].id,
      price: 25.5,
      buyerId: users[1].id
    }),
    Reservation.create({
      sellerId: users[1].id,
      locationId: locations[1].id,
      statusId: statuses[2].id,
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
