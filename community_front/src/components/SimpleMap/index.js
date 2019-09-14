import React, { Component } from "react";
import "./index.css";
import GoogleMapReact from "google-map-react";
import MAP_API_KEY from "../../apis/keys";
import Geocode from "react-geocode";
import MapMarker from "../MapMarker";

/**
 *@prop [allProfiles] array required
 */

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geocodes: [],
      center: { lat: 43, lng: -80 },
      zoom: 13,
      loading: true
    };
  }

  /**
   * 10 profiles, 10 {geocode: pairs}
   */

  componentDidMount() {
    // const { allProfiles } = this.props;
    this.initializeGeocode();

    // when we load this component, we neeed to populate geocode state object
    // so that the markers are ready to render
    // allProfiles.forEach(({ address }, index) => {
    //   this.getGeocodeFromAddress(address);
    //   this.checkGeocodeLoading(index);
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    const { allProfiles: newProfileList } = this.props;
    if (prevProps.allProfiles !== newProfileList) {
      // when we load this component, we neeed to populate geocode state object
      // so that the markers are ready to render
      newProfileList.forEach(({ address }, index) => {
        this.getGeocodeFromAddress(address);
        this.checkGeocodeLoading(index);
      });
    }
  }

  checkGeocodeLoading = index => {
    const { allProfiles } = this.props;
    if (index === allProfiles.length - 1 && parseInt(index) !== 0) {
      this.setState({ loading: false });
    }
  };

  initializeGeocode = () => {
    const { setApiKey, enableDebug } = Geocode;
    setApiKey(MAP_API_KEY);
    enableDebug();
  };

  // MAKE THE MARKERS !!!!
  covertProfileMarkers = () => {
    const { allProfiles } = this.props;
    // removes the numbers from the address
    allProfiles.map(({ address }) =>
      address.substring(address.indexOf(" "), address.length)
    );
  };

  // Get Geocodes For Markers
  getGeocodeFromAddress = address => {
    Geocode.fromAddress(address.toString()).then(res => {
      // grab the lat lng values from the geocode api
      const { lat, lng } = res.results[0].geometry.location;

      // grab the current list of geocodes
      const { geocodes } = this.state;

      // add the geocodes to my exisitng list
      this.setState({ geocodes: [...geocodes, { lat, lng }] });
    });
  };

  handleApiLoaded = (map, maps) => {
    // Standard Markers
    // new maps.Marker({
    //   position: this.state,
    //   map,
    //   title: "Marker1"
    // });
    // new maps.Marker({
    //   position: this.state,
    //   map,
    //   title: "Marker2"
    // });
  };

  render() {
    // Setup the Render variables
    const { allProfiles } = this.props;
    const { geocodes, center, zoom, loading } = this.state;

    if (!loading) {
      return (
        <section style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: MAP_API_KEY }}
            defaultCenter={center}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) =>
              this.handleApiLoaded(map, maps)
            }
          >
            {allProfiles.map((profile, index) => {
              const { id } = profile;
              // Grab the lat, lng from the object inside the geocode array from state
              const { lat, lng } = geocodes[index] || {};

              return <MapMarker key={id} {...profile} lat={lat} lng={lng} />;
            })}
          </GoogleMapReact>
        </section>
      );
    }

    return <div>Loading ... </div>;
  }
}

export default SimpleMap;
