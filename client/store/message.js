import io from 'socket.io-client'

const GET_MESSAGES = 'GET_MESSAGES'
const WRITE_MESSAGE = 'WRITE_MESSAGE'
const POST_MESSAGE = 'POST_MESSAGE'
const CLEAR_MESSAGES = 'CLEAR_MESSAGES'
const SET_SOCKET = 'SET_SOCKET'

const initialState = {historyMessages: [], newMessageText: '', socket: null}

const getMessages = messages => ({type: GET_MESSAGES, messages})
const setSocket = socket => ({type: SET_SOCKET, socket})
export const clearMessages = () => ({type: CLEAR_MESSAGES})
export const writeMessage = text => ({type: WRITE_MESSAGE, text})
export const postMessage = message => ({type: POST_MESSAGE, message})

export const subscribeMessages = reservationId => {
  return dispatch => {
    const socket = io(window.location.origin, {query: {reservationId}})
    dispatch(setSocket(socket))
    socket.on('messages', messages => dispatch(getMessages(messages)))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        historyMessages: [...state.historyMessages, ...action.messages]
      }
    case CLEAR_MESSAGES:
      return initialState
    case WRITE_MESSAGE:
      return {...state, newMessageText: action.text}
    case SET_SOCKET:
      return {...state, socket: action.socket}
    case POST_MESSAGE:
      if (state.socket) {
        state.socket.emit('new_message', action.message)
      }
      return state
    default:
      return state
  }
}
