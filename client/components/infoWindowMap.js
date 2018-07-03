import React, {Component} from 'react'
import {Marker, InfoWindow} from 'react-google-maps'
import LocationScreen from './locationScreen'

class InfoWindowMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  handleToggle = () => {
    this.setState(prevState => ({isOpen: !prevState.isOpen}))
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
        {this.state.isOpen && (
          <InfoWindow>
            <LocationScreen location={this.props.location} />
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

export default InfoWindowMap
