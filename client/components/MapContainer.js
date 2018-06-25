import React from 'react'
import Map from './Map'
if (process.env.NODE_ENV !== 'production') require('../../secrets')

const apiKey = process.env.GOOGLE_MAP

const MapContainer = () => (
  <Map
    containerElement={<div style={{height: `400px`}} />}
    mapElement={<div style={{height: `100%`}} />}
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{height: `100%`}} />}
  />
)

export default MapContainer
