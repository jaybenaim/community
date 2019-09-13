import React from "react";
import "./index.css";
import GoogleMapReact from "google-map-react";
import MAP_API_KEY from "../../apis/keys";
import Geocode from "react-geocode";
import MapMarker from "../MapMarker";
import Root from "../../apis/root";

//  todo set zoom on marker click

class SimpleMap extends React.Component {
  // state = {
  //   user: "",
  //   user1: {
  //     center: {
  //       lat: 0,
  //       lng: 0
  //     },
  //     zoom: 13
  //   },
  //   user2: {
  //     center: {
  //       lat: 0,
  //       lng: 0
  //     },
  //     zoom: 13
  //   }
  // };
  state = { lat: 0, lng: 0 };
  static defaultProps = {
    center: {
      lat: 43.88154,
      lng: -79.46981
    },
    zoom: 13
  };

  // getMyLocation = () => {
  componentDidMount() {
    Geocode.setApiKey(MAP_API_KEY);
    Geocode.enableDebug();
    // Root.get("/profiles/").then(res => {
    //   let address = res.data[0].address;
    //   let lastIndex = address.indexOf(" ");
    //   address = address.substring(lastIndex, address.length);
    //   homeAddress.push(address);
    // });
    let homeAddress = [];
    let profiles = this.props.allProfiles;
    const allProfileAddresses = profiles.map((p, i) => {
      return { ...p };
    });
    /// batch geocode  goes here
    console.log(profiles);
    // Root.get("/profiles/").then(res => {
    //   let address = res.data[0].address;
    //   let lastIndex = address.indexOf(" ");
    //   address = address.substring(lastIndex, address.length);
    //   homeAddress.push(address);
    // });
    // Geocode.fromAddress(`${allProfileAddresses}`).then(
    //   response => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     console.log({ lat, lng });
    //     // this.setState({
    //     //   user1: { center: { lat, lng } }
    //     // });
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
  }
  // console.log(homeAddress);

  render() {
    const { allProfiles } = this.props;
    const homeAddress = [];
    const profileMarkers = allProfiles.map((p, i) => {
      Root.get("/profiles/").then(res => {
        let address = res.data[0].address;
        let lastIndex = address.indexOf(" ");
        address = address.substring(lastIndex, address.length);
        homeAddress.push(address);
      });
      Geocode.fromAddress(`${p.address}`).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log({ lat, lng });
          // this.setState({
          //   user1: { center: { lat, lng } }
          // });
          // this.setState({ lat, lng });
        },
        error => {
          console.error(error);
        }
      );
      return <MapMarker key={p.id} {...p} lat={this.lat} lng={this.lng} />;
    });
    // lat={p.address} lng={p.address}
    const handleApiLoaded = (map, maps) => {
      // Standard Markers
      // new maps.Marker({
      //   position: this.state.user1.center,
      //   map,
      //   title: "Marker1"
      // });
      // new maps.Marker({
      //   position: this.state.user2.center,
      //   map,
      //   title: "Marker2"
      // });
    };

    return (
      <div className="map-container">
        <button onClick={this.getMyLocation}>Get My Location</button>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: MAP_API_KEY
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {/* Place map components here to place on map  */}
            {/* <Marker
              lat={this.state.user1.center.lat}
              lng={this.state.user1.center.lng}
            />
            <MapMarker
              lat={this.state.user2.center.lat}
              lng={this.state.user2.center.lng}
              text="My Marker"
            /> */}
            {profileMarkers}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default SimpleMap;
