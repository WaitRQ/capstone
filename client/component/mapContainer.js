import React, {Component} from 'react'
import MyMapComponent from './myMapComponent'
const apiKey = 'AIzaSyA1ngr1yQhZ1xp-bk7Uk2gCbiSLPFKzUwY'

class MapContainer extends Component {
  constructor() {
    super()
    this.state = {
      currentLatLng: {
        lat: 40.7050497,
        lng: -74.0091149
      }
    }
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          currentLatLng: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
    }
  }

  componentDidMount() {
    this.getGeoLocation()
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{height: `100%`}} />}
        containerElement={<div style={{height: `90%`}} />}
        mapElement={<div style={{height: `100%`}} />}
        defaultCenter={this.state.currentLatLng}
      />
    )
  }
}

export default MapContainer
