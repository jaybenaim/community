import React, { Component } from "react";
import "../index.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { MAP_API_KEY } from "../../../apis/keys";
import Geocode from "react-geocode";
import Root from "../../../apis/root";

/**
 *@prop [allProfiles] array required
 */

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geocodes: [],
      center: { lat: 43.671593898745726, lng: -79.37341993487492 },
      zoom: 10,
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.initializeGeocode();
    this.props.handleNavClassChange();
    const { allProfiles } = this.props;
    !this.state.loading &&
      allProfiles.forEach(({ address }, index) => {
        this.getGeocodeFromAddress(address);
        this.checkGeocodeLoading(index);
      });
  }

  getProfileAddresses = () => {
    Root.get("profiles/").then(res => {
      if (res.data.length < res.data.length - 1)
        this.setState({ users: res.data });
    });
  };

  checkGeocodeLoading = index => {
    const { allProfiles } = this.props;
    console.log(index + allProfiles.length);
    if (index === allProfiles.length - 1) {
      this.setState({ loading: false });
    } else if (
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
  };

  getGeocodeFromAddress = address => {
    Geocode.fromAddress(address.toString()).then(res => {
      const { lat, lng } = res.results[0].geometry.location;
      const { geocodes } = this.state;
      this.setState({ geocodes: [...geocodes, { lat, lng }] });
    });
  };
  mapStyles = {
    width: "100%",
    height: "100%"
  };

  displayMarkers = () => {
    return this.state.geocodes.map((geocode, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{ lat: geocode.lat, lng: geocode.lng }}
        />
      );
    });
  };

  render() {
    const { center, loading } = this.state;

    if (!loading) {
      return (
        <section style={{ height: "100vh", width: "100%" }}>
          <Map
            google={this.props.google}
            zoom={13}
            style={this.mapStyles}
            initialCenter={center}
            centerAroundCurrentLocation
          >
            {this.displayMarkers()}
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
