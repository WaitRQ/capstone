import React, {Component} from 'react'
import {Marker, InfoWindow} from 'react-google-maps'
import LocationScreen from './locationScreen'

var window = {}
class InfoWindowMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      windowTracker: {}
    }
  }

  // toggleClose = () =>{
  //  this.setState({
  //    isOpen: !window.isOpen
  //  })
  // }

  handleToggle = prevState => {
    // if(window.latLng){
    //   this.toggleClose()
    // }

    window = prevState
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      windowTracker: window
    }))
  }

  render() {
    console.log('this.state.windowTracker1', this.state.windowTracker)
    return (
      <Marker
        onClick={this.handleToggle}
        position={{
          lat: this.props.location.latitude,
          lng: this.props.location.longitude
        }}
      >
        {this.state.isOpen && (
          <div style={{width: '800px'}}>
            <InfoWindow>
              <LocationScreen location={this.props.location} />
            </InfoWindow>
          </div>
        )}
      </Marker>
    )
  }
}

export default InfoWindowMap
