import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_RESERVATIONS = 'GOT_ALL_RESERVATIONS'
const GET_RESERVATIONS_BY_USER = 'GET_RESERVATIONS_BY_USER'
const UPDATED_RESERVATION = 'UPDATED_RESERVATION'
/**
 * INITIAL STATE
 */
const initialState = {
  reservationsByUser: [],
  allReservations: []
}

/**
 * ACTION CREATORS
 */
const gotAllReservations = reservations => ({
  type: GOT_ALL_RESERVATIONS,
  reservations
})
const getMyReservations = reservations => ({
  type: GET_RESERVATIONS_BY_USER,
  reservations
})
const updatedReservations = reservation => ({
  type: UPDATED_RESERVATION,
  reservation
})

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
export const fetchMyReservations = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/reservations/user/${userId}`)
    dispatch(getMyReservations(data))
  } catch (err) {
    console.log(err)
  }
}

export const editReservation = resId => async dispatch => {
  try {
    const updatedRes = await axios.put(`/api/reservations/${resId}`)
    dispatch(updatedReservations(updatedRes))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESERVATIONS_BY_USER:
      return {
        reservationsByUser: action.reservations
      }
    case GOT_ALL_RESERVATIONS:
      return {
        ...state,
        allReservations: action.reservations
      }
    case UPDATED_RESERVATION:
      return {
        ...state,
        allReservations: [...state.allReservations, action.reservation]
      }
    default:
      return state
  }
}
