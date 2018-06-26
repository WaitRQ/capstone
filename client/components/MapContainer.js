import React from 'react'
import MapWithSearchBox from './MapWithSearchBox'
import {withGoogleMap} from 'react-google-maps'

const apiKey = 'AIzaSyA1ngr1yQhZ1xp-bk7Uk2gCbiSLPFKzUwY'

const MapContainer = withGoogleMap(() => (
  <MapWithSearchBox
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{height: `100%`}} />}
    containerElement={<div style={{height: `90%`}} />}
    mapElement={<div style={{height: `100%`}} />}
  />
))

export default MapContainer
