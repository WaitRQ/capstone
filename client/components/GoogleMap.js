import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react'
import React from 'react'
import Display from './Display'
if (process.env.NODE_ENV !== 'production') require('../../secrets')

export class GoogleMap extends React.Component {
  constructor() {
    super()
    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false
    }
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    })

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    })

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: true
      })
  }
  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    if (!this.props.loaded) return <div>Loading...</div>

    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 42.39,
          lng: -72.52
        }}
        zoom={15}
      >
        <Marker
          name="Scott P"
          onClick={this.onMarkerClick}
          position={{lat: 42.5, lng: -72.40564}}
        />

        <Marker
          name="Yeshi Wangdi"
          onClick={this.onMarkerClick}
          position={{lat: 42.37483, lng: -72.428093}}
        />

        <Marker name="Umass" onClick={this.onMarkerClick} />

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <Display />
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAP
})(GoogleMap)
