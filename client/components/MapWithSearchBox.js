import React from 'react'
import InfoWindowDisplay from './infoWindowDisplay'

const apiKey = 'AIzaSyA1ngr1yQhZ1xp-bk7Uk2gCbiSLPFKzUwY'

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

const MapWithSearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `90%`}} />,
    mapElement: <div style={{height: `100%`}} />
  }),
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({isOpen}) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  lifecycle({
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
          const bounds = new google.maps.LatLngBounds()

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          })
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }))
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center)

          this.setState({
            center: nextCenter,
            markers: nextMarkers
          })
        }
      })
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
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

    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        onClick={props.onToggleOpen}
        position={marker.position}
      >
        {props.isOpen && (
          <InfoWindow onCloseClick={props.onToggleOpen}>
            <InfoWindowDisplay />
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
))

export default MapWithSearchBox
