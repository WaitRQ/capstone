import axios from 'axios'

const initialState = {
  messages: []
}

const GET_MESSAGES = 'GET_MESSAGES'

export const gotMessages = messages => ({
  type: GET_MESSAGES,
  messages
})

export const getReservationMessages = reservationId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/messages/${reservationId}`)
      const messages = response.data
      dispatch(gotMessages(messages))
    } catch (error) {
      console.error(error)
    }
  }
}

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES: {
      return action.messages
    }
    default:
      return state
  }
}

export default messagesReducer
