import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Marker, InfoWindow} from 'react-google-maps'
import NewReservation from './NewReservation'
import {addCurrentUserLocation} from '../store/location'

class InfoWindowMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  shouldComponentUpdate = () => {
    console.log('this is the user data', this.props.userData)
    var userData = {
      name: this.props.userData.name,
      address: this.props.userData.address,
      latitude: this.props.userData.latitude,
      longitude: this.props.userData.longitude
    }
    addCurrentUserLocation(userData)
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
            <NewReservation location={this.props.location} />
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

const mapDispatch = dispatch => ({
  addCurrentUserLocation: userData => dispatch(addCurrentUserLocation(userData))
})

export default connect(null, mapDispatch)(InfoWindowMap)
