import React from "react";
import axios from "axios";
import "./index.css";
import GoogleMapReact from "google-map-react";
import MAP_API_KEY from "../../apis/keys";

class SimpleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 43.88154,
      lng: -79.46981
    },
    zoom: 15
  };

  render() {
    const handleApiLoaded = (map, maps) => {
      // use map and maps objects
    };
    return (
      <div className="map-container">
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
            {/* <ShowMap lat={43.653225} lng={-79.383186} text="My Marker" /> */}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default SimpleMap;
