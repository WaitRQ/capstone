import {expect} from 'chai'
import {loadReservation} from './reservation'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    allReservations: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('loadReservation', () => {
    const reservation = {id: 1, price: 25.5, date: '2018-07-03'}
    it('eventually dispatches the gotAllReservations(data) action', () => {
      mockAxios.onGet('/api/reservations').replyOnce(200, reservation)
      return store.dispatch(loadReservation()).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GOT_ALL_RESERVATIONS')
      })
    })
    it('It returns all the reservations', () => {
      mockAxios.onGet('/api/reservations').replyOnce(200, reservation)
      return store.dispatch(loadReservation()).then(() => {
        const actions = store.getActions()
        expect(actions[0].reservations.price).to.be.deep.equal(25.5)
      })
    })
  })
})
