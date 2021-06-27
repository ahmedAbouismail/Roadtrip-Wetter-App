import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';

// components:
import Marker from '../Marker/Marker';

// examples:
import GoogleMap from '../google-map/GoogleMap';
import AutoComplete from '../google-autocomplete-comp/Autocomplete';

// consts
import HTW_CENTER from '../../const/la_center';
import OrteDisplay from '../ort-display/ort-display';

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
    };
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  addPlace = (place) => {
    this.setState({ places: [place] });
    // this.setMarkers([{place}]);
    // console.log("Markers", this.markers);
    // this.setState({places, [place]});
    // this.setState({places: [place]});

    console.log("Places Complete", this.state.places);
    // console.log("place", place.address_components[1].long_name);
    // console.log("places", this.state.places[0].address_components[1].long_name);
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    this.props.handleOrt(
      place.place_id,
      place.name,
      lat,
      lng,
      );
      if (lat != null && lng != null) {
        this.props.weatherData(
          lat,
          lng
        )
      }
    
  };

  render() {
    // this.props.handleOrt(this.state.places);
    const {
      places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    return (
      <div>
        {/* {mapApiLoaded && (
          <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
        )} */}

        {mapApiLoaded && (
          <AutoComplete
          map={mapInstance} 
          mapApi={mapApi} 
          addplace={this.addPlace} 
          // handleOrt={this.props.handleOrt}
          />
        )}
        {/* {console.log("Aufruf")}
        {!isEmpty(places) &&
        <OrteDisplay 
        ort={this.state.places[0].address_components[1].long_name}/>} */}

        <GoogleMap
          defaultZoom={12}
          defaultCenter={HTW_CENTER}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_MAP_KEY,
            libraries: ['places', 'geometry'],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          {/* {!isEmpty(places)
            && places.map((place) => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
              />
            ))} */}
            {!isEmpty(this.props.orte)
            && this.props.orte.map((ort) => (
              <Marker
                key={ort[0]}
                text={ort[1]}
                lat={ort[2]}
                lng={ort[3]}
              />
            ))}
        </GoogleMap>
      </div>
    );
  }
}

export default Autocomplete;
