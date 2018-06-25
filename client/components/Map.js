import React from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'

const Map = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{lat: 40.705247, lng: -74.008351}}
    >
      Hello
      <Marker position={{lat: 40.705247, lng: -74.008351}} />
    </GoogleMap>
  ))
)

export default Map
