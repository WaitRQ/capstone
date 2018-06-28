import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_RESERVATION = 'GET_RESERVATION'
const GET_RESERVATIONS_BY_USER = 'GET_RESERVATIONS_BY_USER'
const MAKE_RESERVATION = 'MAKE_RESERVATION'

/**
 * INITIAL STATE
 */
const initialState = {
  reservationsByUser: [],
  newReservations: []
}

/**
 * ACTION CREATORS
 */
const getReservation = reservation => ({type: GET_RESERVATION, reservation})
const getMyReservations = reservations => ({
  type: GET_RESERVATIONS_BY_USER,
  reservations
})
const makeReservation = reservation => ({type: MAKE_RESERVATION, reservation})

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
export const fetchMyReservations = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/reservations/user/${userId}`)
    dispatch(getMyReservations(data))
  } catch (err) {
    console.log(err)
  }
}

export const createReservation = newReservation => async dispatch => {
  try {
    const {data} = await axios.post(`/api/reservations/`, newReservation)
    dispatch(makeReservation(data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESERVATION:
      return {...state, newReservations: action.reservation}
    case GET_RESERVATIONS_BY_USER:
      return {...state, reservationsByUser: action.reservations}
    case MAKE_RESERVATION:
      return {
        ...state,
        reservationsByUser: [...state.reservationsByUser, action.reservation],
        newReservations: [...state.newReservations, action.reservation]
      }
    default:
      return state
  }
}
