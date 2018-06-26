import React, {Component} from 'react'

import MapContainer from './MapContainer'
import InfoWindowDisplay from './infoWindowDisplay'

const apiKey = 'AIzaSyA1ngr1yQhZ1xp-bk7Uk2gCbiSLPFKzUwY'
var address = ''
const _ = require('lodash')
const {compose, withProps, lifecycle, withStateHandlers} = require('recompose')
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} = require('react-google-maps')

const {SearchBox} = require('react-google-maps/lib/components/places/SearchBox')

class MapWithSearchBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      markers: [],
      bounds: {},
      center: {},
      isOpen: false
    }
  }

  onToggleOpen = () => {
    this.setState(prevState => ({isOpen: !!prevState.isOpen}))
  }

  componentWillMount() {
    const refs = {}
    this.setState({
      bounds: null,
      center: {
        lat: 40.705247,
        lng: -74.008351
      },
      markers: [],
      onMapMounted: ref => {
        refs.map = ref
      },
      onBoundsChanged: () => {
        this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter()
        })
      },
      onSearchBoxMounted: ref => {
        refs.searchBox = ref
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces()
        address = places
        const bounds = new google.maps.LatLngBounds()
        console.log('places', places)

        places.forEach(place => {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        }) //for each
        const nextMarkers = places.map(place => ({
          position: place.geometry.location
        }))
        const nextCenter = _.get(nextMarkers, '0.position', this.state.center)
        this.setState({
          center: nextCenter,
          markers: nextMarkers
        }) //set state
      } //on places changed
    }) //Set State
  } //componentWillMount

  // withScriptjs,
  // withGoogleMap //compose
  render() {
    return (
      <GoogleMap
        ref={this.onMapMounted}
        defaultZoom={15}
        center={this.state.center}
        onBoundsChanged={this.onBoundsChanged}
      >
        <SearchBox
          ref={this.onSearchBoxMounted}
          bounds={this.state.bounds}
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

        {this.state.markers.map((marker, index) => (
          <Marker
            key={index}
            onClick={this.onToggleOpen}
            position={this.state.marker.position}
          >
            {this.state.isOpen && (
              <InfoWindow onCloseClick={this.state.onToggleOpen}>
                <InfoWindowDisplay bounds={address} />
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    )
  }
}

export default MapWithSearchBox
