import axios from 'axios'

const initialState = {
  allLocations: [],
  currentLocation: {}
}

const GOT_ALL_LOCATIONS = 'GOT_ALL_LOCATIONS'
const ADDED_LOCATION = 'ADDED_LOCATION'

export const gotAllLocations = locations => ({
  type: GOT_ALL_LOCATIONS,
  locations
})

export const addedLocation = location => ({
  type: ADDED_LOCATION,
  location
})

export const getAllLocations = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/locations')
      const allLocations = response.data
      dispatch(gotAllLocations(allLocations))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addCurrentUserLocation = userData => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/locations', userData)
      const location = response.data
      dispatch(addedLocation(location))
    } catch (error) {
      console.error(error)
    }
  }
}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_LOCATIONS: {
      return {
        ...state,
        allLocations: action.locations
      }
    }
    case ADDED_LOCATION: {
      return {
        ...state,
        allLocations: [...state.allLocations, action.location],
        currentLocation: action.location
      }
    }
    default:
      return state
  }
}

export default locationReducer
