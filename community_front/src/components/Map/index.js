import React from "react";
import "./index.css";
import GoogleMapReact from "google-map-react";
import MAP_API_KEY from "../../apis/keys";
import Geocode from "react-geocode";
import Root from "../../apis/root";
import MapMarker from "../MapMarker";

class SimpleMap extends React.Component {
  state = {
    user1: {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 13
    },
    user2: {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 13
    }
  };
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
    let homeAddress = [];
    Root.get("/profiles/")
      .then(res => {
        let address = res.data[1].address;
        let lastIndex = address.indexOf(" ");
        address = address.substring(lastIndex, address.length);
        homeAddress.push(address);
        console.log(homeAddress[0]);
      })
      .then(res => {
        Geocode.fromAddress(`${homeAddress[0]}`).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            this.setState({ center: { lat, lng } });
            console.log(lat, lng);
          },
          error => {
            console.error(error);
          }
        );
      });
  }

  render() {
    const handleApiLoaded = (map, maps) => {
      // use map and maps objects
      let marker = new maps.Marker({
        position: this.state.center,
        map,
        title: "Hello World!"
      });
      let marker2 = new maps.Marker({
        position: {
          lat: 43.88154,
          lng: -79.46981
        },
        map,
        title: "Hello World!"
      });
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
            {/* <MapMarker
              lat={this.state.lat}
              lng={this.state.lng}
              text="My Marker"
            /> */}
            <Marker lat={this.state.lat} lng={this.state.lng} />
            <MarkerTwo lat={this.state.lat} lng={this.state.lng} />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
const Marker = props => {
  return <div className="pin"></div>;
};
const MarkerTwo = props => {
  return <div className="pin"></div>;
};
export default SimpleMap;
