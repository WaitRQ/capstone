import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_RESERVATION = 'GET_RESERVATION'

/**
 * INITIAL STATE
 */
const defaultReservation = []

/**
 * ACTION CREATORS
 */
const getReservation = reservation => ({type: GET_RESERVATION, reservation})

/**
 * THUNK CREATORS
 */
export const loadReservation = () => async dispatch => {
  try {
    const res = await axios.get('/api/reservations')
    dispatch(getReservation(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultReservation, action) {
  switch (action.type) {
    case GET_RESERVATION:
      return action.reservation
    default:
      return state
  }
}
