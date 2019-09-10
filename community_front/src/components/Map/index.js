import React from "react";
import axios from "axios";
import "./index.css";
import GoogleMapReact from "google-map-react";
import ShowMap from '../mapShow'


class SimpleMap extends React.Component {
  props = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <div className="map-container">
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBvFKd_Y1LlmnjZFVoytzh_mCNDimEnP4M"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <ShowMap lat={59.955413} lng={30.337844} text="My Marker" />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default SimpleMap;
