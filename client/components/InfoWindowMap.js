import React, {Component} from 'react'
import {Marker, InfoWindow} from 'react-google-maps'
import NewReservation from './newReservation'

class InfoWindowMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  handleToggle = () => {
    console.log('in handle toggel')
    this.setState(prevState => ({isOpen: !prevState.isOpen}))
  }

  render() {
    console.log('these are my props', this.props)

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
            <NewReservation location={this.props.location} />
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

export default InfoWindowMap
