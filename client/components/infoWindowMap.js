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

  //   handleCloseToggle =  (marker) => {
  // console.log("in HandleCloseToggle")
  //
  //     this.setState(marker => ({
  //       isOpen: !marker.isOpen,
  //
  //     }))
  //
  //   }

  handleToggle = () => {
    console.log('in handletoggle', this)
    this.props.windowTracker(this.props.myUniqKey)

    // this.setState(prevState => ({
    //   isOpen: !prevState.isOpen,
    //
    // }))
  }

  render() {
    console.log('in render')
    console.log('isOPen', this.props.isOpen)
    console.log('my uniq key', this.props.myUniqKey)
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
