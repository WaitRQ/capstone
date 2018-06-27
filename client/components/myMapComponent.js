import React, {Component} from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
const {SearchBox} = require('react-google-maps/lib/components/places/SearchBox')
import {connect} from 'react-redux'
import InfoWindowMap from './InfoWindowMap'

const refs = {}

class MyMapComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: {
        lat: this.props.defaultCenter.lat,
        lng: this.props.defaultCenter.lng
      },
      address: '',
      name: ''
    }
  }

  onMapMounted = ref => {
    refs.map = ref
  }
  onSearchBoxMounted = ref => {
    refs.searchBox = ref
  }

  onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces()
    const bounds = new google.maps.LatLngBounds()
    console.log('places', places)
    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
      console.log('this.is bounds.f.b', bounds.f.b)
      console.log('this.is bounds.b.b', bounds.b.b)

      this.setState({
        center: {
          lat: bounds.f.b,
          lng: bounds.b.b
        },
        address: places[0].formatted_address,
        name: places[0].name
      })
    })
  }

  render() {
    console.log('this is refs', refs)
    console.log(this.state)
    return (
      <div>
        <GoogleMap defaultZoom={14} center={this.state.center}>
          {this.props.allLocations.length &&
            this.props.allLocations.map(location => {
              return <InfoWindowMap key={location.id} location={location} />
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

export default connect(mapStateToProps)(
  withScriptjs(withGoogleMap(MyMapComponent))
)
