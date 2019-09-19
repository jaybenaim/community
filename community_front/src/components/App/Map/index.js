import React, { Component } from "react";
import "../index.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { MAP_API_KEY } from "../../../apis/keys";
import Geocode from "react-geocode";
import MapMarker from "./MapMarker";
import Root from "../../../apis/root";

/**
 *@prop [allProfiles] array required
 */

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geocodes: [{ lat: 43.99, lng: -79 }],
      center: { lat: 43.671593898745726, lng: -79.37341993487492 },
      zoom: 10,
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.props.handleNavClassChange();

    // const { allProfiles } = this.props;
    this.initializeGeocode(); // when we load this component, we neeed to populate geocode state object // so that the markers are ready to render // allProfiles.forEach(({ address }, index) => { //   this.getGeocodeFromAddress(address); //   this.checkGeocodeLoading(index); // });
    // this.getProfileAddresses();
  }

  componentDidUpdate(prevProps, prevState) {
    const { users: newProfileList } = this.state;
    if (prevProps.allProfiles !== newProfileList) {
      // when we load this component, we neeed to populate geocode state object
      // so that the markers are ready to render
      newProfileList.forEach(({ address }, index) => {
        this.getGeocodeFromAddress(address);
        this.checkGeocodeLoading(index);
      });
    }
  }
  getProfileAddresses = () => {
    Root.get("profiles/").then(res => {
      this.setState({ users: res.data });
    });
  };

  checkGeocodeLoading = index => {
    const { allProfiles } = this.props;
    if (
      index === allProfiles.length - 1 &&
      parseInt(index) !== 0 &&
      index !== 1
    ) {
      this.setState({ loading: true });
    }
  };

  initializeGeocode = () => {
    const { setApiKey, enableDebug } = Geocode;
    setApiKey(MAP_API_KEY);
    enableDebug();
  }; // MAKE THE MARKERS !!!!

  covertProfileMarkers = () => {
    const { allProfiles } = this.props; // removes the numbers from the address
    allProfiles.map(({ address }) =>
      address.substring(address.indexOf(" "), address.length)
    );
  }; // Get Geocodes For Markers

  getGeocodeFromAddress = address => {
    Geocode.fromAddress(address.toString()).then(res => {
      // grab the lat lng values from the geocode api
      const { lat, lng } = res.results[0].geometry.location; // grab the current list of geocodes

      const { geocodes } = this.state; // add the geocodes to my exisitng list

      this.setState({ geocodes: [...geocodes, { lat, lng }] });
    });
  };
  mapStyles = {
    width: "100%",
    height: "100%"
  };

  render() {
    // Setup the Render variables
    const { allProfiles } = this.props;
    const { geocodes, center, zoom, loading } = this.state;

    let markers = allProfiles.map((profile, index) => {
      const { id } = profile; // Grab the lat, lng from the object inside the geocode array from state
      const { lat, lng } = geocodes[index] || {};

      // return <MapMarker key={id} {...profile} lat={lat} lng={lng} />;
      return <Marker position={{ lat, lng }} />;
    });

    if (!loading) {
      return (
        <section style={{ height: "100vh", width: "100%" }}>
          {/*
          <GoogleMapReact
            bootstrapURLKeys={{ key: MAP_API_KEY }}
            defaultCenter={center}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
          >

            {allProfiles.map((profile, index) => {
              const { id } = profile; // Grab the lat, lng from the object inside the geocode array from state
              const { lat, lng } = geocodes[index] || {};

              return <MapMarker key={id} {...profile} lat={lat} lng={lng} />;
            })}

          </GoogleMapReact> */}
          <Map
            google={this.props.google}
            zoom={13}
            style={this.mapStyles}
            initialCenter={this.state.center}
          >
            {markers}
          </Map>
        </section>
      );
    }

    return <div>Loading ... </div>;
  }
}

export default GoogleApiWrapper({
  apiKey: MAP_API_KEY
})(SimpleMap);
