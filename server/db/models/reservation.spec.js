/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Reservation = db.model('reservation')
const User = db.model('user')
const Location = db.model('location')
// const Status = db.model('status')

describe('Reservation model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Class Methods', () => {
    describe('getReservationsAsBuyerByUserId', () => {
      const testReservation1 = {
        date: '2018-04-26',
        sellerId: 1,
        buyerId: 2,
        // statusId: 1,
        locationId: 1
      }
      const testReservation2 = {
        date: '2018-05-26',
        sellerId: 1,
        buyerId: 3,
        // statusId: 1,
        locationId: 2
      }
      const testReservation3 = {
        date: '2018-06-26',
        sellerId: 2,
        buyerId: 3,
        // statusId: 2,
        locationId: 2
      }

      const testUser1 = {
        name: 'Huu',
        email: 'huu@email.com'
      }
      const testUser2 = {
        name: 'Scott',
        email: 'scott@email.com'
      }
      const testUser3 = {
        id: 3,
        name: 'Yeshi',
        email: 'yeshi@email.com'
      }

      const testLocation1 = {
        name: 'funPlace'
      }

      const testLocation2 = {
        name: 'dullPlace'
      }

      beforeEach(async () => {
        await Location.bulkCreate([testLocation1, testLocation2])

        await User.bulkCreate([testUser1, testUser2, testUser3])

        // await Status.create(
        //   {
        //     type: 'paid'
        //   });

        await Reservation.bulkCreate([
          testReservation1,
          testReservation2,
          testReservation3
        ])
      })

      it('Returns testReservation2 and testReservation3 when query by userId 3', async () => {
        const rets = await Reservation.getReservationsAsBuyerByUserId(3)
        console.log('_________rets', rets[0].buyer)
        expect(rets)
          .to.be.an('array')
          .that.to.have.lengthOf(2)

        expect(rets[0].buyerId).to.be.equal(testUser3.id)
        // expect(rets[0].portfolioMetadatumId)
        //   .to.be.equal(TEST_PORTFOLIODATA_1.portfolioMetadatumId);
        // expect(rets[0].securityId)
        //   .to.be.equal(TEST_PORTFOLIODATA_1.securityId);
        // expect(rets[0].security.ticker).to.be.equal(TEST_SECURITY_1.ticker);

        // expect(rets[1].position).to.be.equal(TEST_PORTFOLIODATA_2.position);
        // expect(rets[1].portfolioMetadatumId)
        //   .to.be.equal(TEST_PORTFOLIODATA_2.portfolioMetadatumId);
        // expect(rets[1].securityId)
        //   .to.be.equal(TEST_PORTFOLIODATA_2.securityId);
        // expect(rets[1].security.ticker).to.be.equal(TEST_SECURITY_2.ticker);
      })

      // it('Returns empty when query by TEST_PORTFOLIOMETADATA_ID_3', async () => {
      //   const rets = await PortfolioData.listPortfolioDataByPortfolioMetadataId(
      //     TEST_PORTFOLIOMETADATA_ID_3);
      //   expect(rets).to.be.an('array').that.is.empty;
      // });
    })
  })
})
