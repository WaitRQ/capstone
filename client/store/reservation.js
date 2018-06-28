import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_RESERVATION = 'GET_RESERVATION'
const GET_RESERVATIONS_BY_USER = 'GET_RESERVATIONS_BY_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  reservationsByUser: [],
  openReservationsByLocation: []
}

/**
 * ACTION CREATORS
 */
const getReservation = reservation => ({type: GET_RESERVATION, reservation})
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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESERVATIONS_BY_USER:
      return {reservationsByUser: action.reservations}
    default:
      return state
  }
}
