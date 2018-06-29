import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_RESERVATIONS = 'GOT_ALL_RESERVATIONS'
const GET_RESERVATIONS_BY_USER = 'GET_RESERVATIONS_BY_USER'

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
    default:
      return state
  }
}
