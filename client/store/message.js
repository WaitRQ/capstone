import io from 'socket.io-client'

const GET_HISTORY_MESSAGES = 'GET_HISTORY_MESSAGES'

const initialState = []

export const subscribeMessages = reservationId => {
  return dispatch => {
    const socket = io(window.location.origin, {query: {reservationId}})
    socket.on('new_message', message => {
      console.log(message)
    })
  }
}
