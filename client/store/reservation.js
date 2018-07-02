import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_RESERVATIONS = 'GOT_ALL_RESERVATIONS'
const UPDATED_RESERVATION = 'UPDATED_RESERVATION'

const MAKE_RESERVATION = 'MAKE_RESERVATION'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const gotAllReservations = reservations => ({
  type: GOT_ALL_RESERVATIONS,
  reservations
})

const updatedReservations = reservation => ({
  type: UPDATED_RESERVATION,
  reservation
})

const makeReservation = reservation => ({type: MAKE_RESERVATION, reservation})

/**
 * THUNK CREATORS
 */
export const loadReservation = () => async dispatch => {
  try {
    const res = await axios.get('/api/reservations')
    dispatch(gotAllReservations(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const editReservation = resObj => async dispatch => {
  try {
    const updatedRes = await axios.put(`/api/reservations/${resObj.id}`, resObj)
    dispatch(updatedReservations(updatedRes.data))
  } catch (error) {
    console.error(error)
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
    case GOT_ALL_RESERVATIONS:
      return action.reservations
    case UPDATED_RESERVATION:
      return [
        ...state.filter(res => res.id !== action.reservation.id),
        ...action.reservation
      ]
    case MAKE_RESERVATION:
      return [...state, ...action.reservation]
    default:
      return state
  }
}
