import {expect} from 'chai'
import {getAllLocations} from './location'
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
    allLocations: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllLocations', () => {
    const location = {
      id: 1,
      name: 'Apple Soho',
      address: '103 Prince Street, New York'
    }
    it('eventually dispatches the gotAllLocations(data) action', () => {
      mockAxios.onGet('/api/locations').replyOnce(200, location)
      return store.dispatch(getAllLocations()).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GOT_ALL_LOCATIONS')
      })
    })
    it('It returns all the reservations', () => {
      mockAxios.onGet('/api/locations').replyOnce(200, location)
      return store.dispatch(getAllLocations()).then(() => {
        const actions = store.getActions()
        console.log('Action[0]', actions[0])
        expect(actions[0].locations.name).to.be.deep.equal('Apple Soho')
      })
    })
  })
})
