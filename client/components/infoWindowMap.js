import React, {Component} from 'react'
import {Marker, InfoWindow} from 'react-google-maps'
import LocationScreen from './locationScreen'

class InfoWindowMap extends Component {
  constructor(props) {
    super(props)
  }

  handleToggle = () => {
    this.props.windowTracker(this.props.myUniqKey)
  }

  render() {
    return (
      <Marker
        onClick={this.handleToggle}
        position={{
          lat: this.props.location.latitude,
          lng: this.props.location.longitude
        }}
      >
        {this.props.isOpen === this.props.myUniqKey && (
          <InfoWindow>
            <LocationScreen location={this.props.location} />
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

export default InfoWindowMap
