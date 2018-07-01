import io from 'socket.io-client'

const GET_MESSAGES = 'GET_MESSAGES'
const CLEAR_MESSAGES = 'CLEAR_MESSAGES'

const initialState = []

const getMessages = messages => ({type: GET_MESSAGES, messages})
export const clearMessages = () => ({type: CLEAR_MESSAGES})

export const subscribeMessages = reservationId => {
  return dispatch => {
    const socket = io(window.location.origin, {query: {reservationId}})
    socket.on('messages', messages => dispatch(getMessages(messages)))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES: {
      return [...state, ...action.messages]
    }
    case CLEAR_MESSAGES: {
      return initialState
    }
    default:
      return state
  }
}
