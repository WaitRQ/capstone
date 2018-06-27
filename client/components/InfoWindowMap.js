import React, {Component} from 'react'
import {Marker, InfoWindow} from 'react-google-maps'
import NewReservation from './NewReservation'

class InfoWindowMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  handleToggleOpen = () => {
    this.setState({
      isOpen: true
    })
  }

  handleToggleClose = () => {
    this.setState({
      isOpen: false
    })
  }
  render() {
    console.log('these are my props', this.props)

    return (
      <Marker
        key={this.props.index}
        position={this.props.position}
        onClick={() => this.handleToggleOpen()}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.props.handleCloseCall}>
            <NewReservation />
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

export default InfoWindowMap
