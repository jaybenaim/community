import React from "react";
import "./index.css";

class MapMarker extends React.Component {
  render() {
    const { id, address } = this.props;
    // console.log(id);
    // todo pass in item for class to show item
    return <div className="hammer"></div>;
  }
}

export default MapMarker;
