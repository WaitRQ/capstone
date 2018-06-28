import axios from 'axios'

const initialState = {
  allLocations: [],
  currentLocation: {}
}

const GOT_ALL_LOCATIONS = 'GOT_ALL_LOCATIONS'

export const gotAllLocations = locations => ({
  type: GOT_ALL_LOCATIONS,
  locations
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

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_LOCATIONS: {
      return {
        ...state,
        allLocations: action.locations
      }
    }
    default:
      return state
  }
}

export default locationReducer
