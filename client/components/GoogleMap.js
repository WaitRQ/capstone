import {Map, GoogleApiWrapper} from 'google-maps-react'
import React from 'react'
if (process.env.NODE_ENV !== 'production') require('../../secrets')

export class GoogleMap extends React.Component {
  render() {
    const style = {
      width: '100%',
      height: '100%'
    }

    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 42.39,
          lng: -72.52
        }}
        zoom={15}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAP
})(GoogleMap)
