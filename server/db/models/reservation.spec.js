/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Reservation = db.model('reservation')
const User = db.model('user')
const Location = db.model('location')
const Status = db.model('status')

describe('Reservation model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Class Methods', () => {
    describe('getReservationsByUserId', () => {
      const testReservation1 = {
        id: 1,
        date: '2018-04-26',
        price: 10,
        sellerId: 1,
        buyerId: 2,
        statusId: 1,
        locationId: 1
      }
      const testReservation2 = {
        id: 2,
        date: '2018-05-26',
        price: 20,
        sellerId: 1,
        buyerId: 3,
        statusId: 1,
        locationId: 1
      }
      const testReservation3 = {
        id: 3,
        date: '2018-06-26',
        price: 30,
        sellerId: 2,
        buyerId: 3,
        statusId: 2,
        locationId: 2
      }

      const testUser1 = {
        id: 1,
        name: 'Huu',
        email: 'huu@email.com'
      }
      const testUser2 = {
        id: 2,
        name: 'Scott',
        email: 'scott@email.com'
      }
      const testUser3 = {
        id: 3,
        name: 'Yeshi',
        email: 'yeshi@email.com'
      }

      const testLocation1 = {
        id: 1,
        name: 'funPlace'
      }

      const testLocation2 = {
        id: 2,
        name: 'dullPlace'
      }

      const testStatus1 = {
        id: 1,
        type: 'open'
      }
      const testStatus2 = {
        id: 2,
        type: 'completed'
      }

      beforeEach(async () => {
        await User.bulkCreate([testUser1, testUser2, testUser3])
        await Location.bulkCreate([testLocation1, testLocation2])
        await Status.bulkCreate([testStatus1, testStatus2])
        const res = await Reservation.bulkCreate([
          testReservation1,
          testReservation2,
          testReservation3
        ])
      })

      it('Returns testReservation1 and testReservation3 when query by userId 2', async () => {
        const rets = await Reservation.getReservationsByUserId(2)
        expect(rets)
          .to.be.an('array')
          .that.to.have.lengthOf(2)

        expect(rets[0].date).to.be.equal(testReservation1.date)
        expect(rets[1].buyerId).to.be.equal(testReservation3.buyerId)
      })

      it('Eager loading user, location, and status', async () => {
        const rets = await Reservation.getReservationsByUserId(1)
        // return [testReservation2, testReservation1]
        // Sequelize findAll NOT in order
        expect(rets)
          .to.be.an('array')
          .that.to.have.lengthOf(2)
        expect(rets[0].seller.name).to.be.equal(testUser1.name)
        expect(rets[0].location.name).to.be.equal(testLocation1.name)
        expect(rets[1].status.type).to.be.equal(testStatus1.type)
      })
    })
  })
})
