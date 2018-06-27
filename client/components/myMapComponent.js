import React from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
const {SearchBox} = require('react-google-maps/lib/components/places/SearchBox')
import {connect} from 'react-redux'

const MyMapComponent = withScriptjs(
  withGoogleMap(props => {
    console.log('this.props', props)
    return (
      <div>
        <GoogleMap
          defaultZoom={14}
          center={{
            lat: props.defaultCenter.lat,
            lng: props.defaultCenter.lng
          }}
        >
          {props.allLocations.length &&
            props.allLocations.map(location => {
              return (
                <Marker
                  key={location.id}
                  position={{lat: location.latitude, lng: location.longitude}}
                />
              )
            })}
        </GoogleMap>
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
      </div>
    )
  })
)

const mapStateToProps = state => ({
  allLocations: state.location.allLocations
})

export default connect(mapStateToProps)(MyMapComponent)
