import React from "react";
import axios from "axios";

const ShowMap = () => {
  ///// storing api key???/?
  axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=API_KEY");

  return <div> Map goes here </div>;
};

export default ShowMap;
