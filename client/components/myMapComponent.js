import React, {Component} from 'react'
import {withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps'
const {SearchBox} = require('react-google-maps/lib/components/places/SearchBox')
import {connect} from 'react-redux'
import InfoWindowMap from './infoWindowMap'
import {addCurrentUserLocation} from '../store/location'

const refs = {}

class MyMapComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: {
        lat: this.props.defaultCenter.lat,
        lng: this.props.defaultCenter.lng
      },
      windows: null,
      newLocation: ''
    }
  }

  windowTracker = markerKey => {
    console.log('in windowTracker')
    this.setState({
      windows: markerKey
    })
    console.log('______', this.state.windows)
  }

  onMapMounted = ref => {
    refs.map = ref
  }
  onSearchBoxMounted = ref => {
    refs.searchBox = ref
  }

  onPlacesChanged = async () => {
    const places = refs.searchBox.getPlaces()
    const bounds = new google.maps.LatLngBounds()

    places.forEach(place => {
      bounds.extend(place.geometry.location)
    })

    this.setState({
      center: {
        lat: bounds.f.b,
        lng: bounds.b.b
      }
    })

    var userData = {
      name: places[0].name,
      address: places[0].formatted_address,
      latitude: bounds.f.b,
      longitude: bounds.b.b
    }

    await this.props.addCurrentUserLocation(userData)
    this.setState({
      windows: this.props.allLocations[this.props.allLocations.length - 1].id
    })
  }

  render() {
    console.log('this state.windows', this.state.windows)
    console.log('this is user data', this.state)
    return (
      <div>
        <GoogleMap defaultZoom={14} center={this.state.center}>
          {this.props.allLocations.length &&
            this.props.allLocations.map(location => {
              return (
                <InfoWindowMap
                  windowTracker={this.windowTracker}
                  isOpen={this.state.windows}
                  myUniqKey={location.id}
                  key={location.id}
                  userData={this.state}
                  location={location}
                />
              )
            })}
        </GoogleMap>

        <SearchBox
          ref={this.onSearchBoxMounted}
          bounds={this.props.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`
            }}
          />
        </SearchBox>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allLocations: state.location.allLocations
})

const mapDispatch = dispatch => ({
  addCurrentUserLocation: userData => dispatch(addCurrentUserLocation(userData))
})

export default connect(mapStateToProps, mapDispatch)(
  withScriptjs(withGoogleMap(MyMapComponent))
)

// places.forEach(place => {
//   if (place.geometry.viewport) {
//     bounds.union(place.geometry.viewport)
//   } else {
//     bounds.extend(place.geometry.location)
//   }
// })
