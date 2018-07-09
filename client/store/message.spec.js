import {expect} from 'chai'
import messageReducer, {getMessages, createMessage} from './message'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('messageReducer', () => {
  it('starts with initial state of an empty array, empty string, and null value', () => {
    const newState = messageReducer(undefined, '@@INIT')
    expect(newState).to.deep.equal({
      historyMessages: [],
      newMessageText: '',
      socket: null
    })
  })
})
