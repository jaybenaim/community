// import React from "react";
// import "./index.css";
// import GoogleMapReact from "google-map-react";
// import MAP_API_KEY from "../../apis/keys";
// import Geocode from "react-geocode";
// import MapMarker from "../MapMarker";
// import Root from "../../apis/root";

// //  todo set zoom on marker click

// class SimpleMap extends React.Component {
//   state = { lat: 43.88154, lng: -79.46981, users: 0 };
//   static defaultProps = {
//     center: {
//       lat: 43.88154,
//       lng: -79.46981
//     },
//     zoom: 13
//   };

//   // getMyLocation = () => {
//   componentDidMount() {
//     Geocode.setApiKey(MAP_API_KEY);
//     Geocode.enableDebug();
//   }

//   // changeState() {
//   //   this.setState(prevState => ({ lat, lng, users: prevState + 1 }));
//   // }
//   handleApiLoaded = (map, maps) => {
//     // Standard Markers
//     // new maps.Marker({
//     //   position: this.state,
//     //   map,
//     //   title: "Marker1"
//     // });
//     // new maps.Marker({
//     //   position: this.state,
//     //   map,
//     //   title: "Marker2"
//     // });
//   };
//   render() {
//     const { allProfiles } = this.props;
//     // const homeAddress = [];

//     const profileMarkers = allProfiles.map((p, i) => {
//       Root.get("/profiles/", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${window.localStorage["token"]}`
//         }
//       }).then(res => {
//         let address = res.data[0].address;

//         let lastIndex = address.indexOf(" ");
//         address = address.substring(lastIndex, address.length);

//         // homeAddress.push(address);
//       });
//       Geocode.fromAddress(`${p.address}`).then(
//         response => {
//           const { lat, lng } = response.results[0].geometry.location;
//           // this.changeState(lat, lng);
//           // this.setState(prevState => ({ lat, lng, users: prevState + 1 }));
//           // this.setState({ lat, lng });
//           console.log({ lat, lng });
//           console.log(p.id);
//           console.log(this.state.lat);
//           return (
//             <>
//               <GoogleMapReact
//                 bootstrapURLKeys={{
//                   key: MAP_API_KEY
//                 }}
//                 defaultCenter={this.props.center}
//                 defaultZoom={this.props.zoom}
//                 yesIWantToUseGoogleMapApiInternals
//                 onGoogleApiLoaded={({ map, maps }) =>
//                   this.handleApiLoaded(map, maps)
//                 }
//               >
//                 <MapMarker
//                   key={p.id}
//                   {...p}
//                   lat={this.state.lat}
//                   lng={this.state.lng}
//                 />
//               </GoogleMapReact>
//             </>
//           );
//         },
//         error => {
//           console.error(error);
//         }
//       );
//     });
//     const handleApiLoaded = (map, maps) => {
//       // Standard Markers
//       // new maps.Marker({
//       //   position: this.state,
//       //   map,
//       //   title: "Marker1"
//       // });
//       // new maps.Marker({
//       //   position: this.state,
//       //   map,
//       //   title: "Marker2"
//       // });
//     };

//     return (
//       <div className="map-container">
//         <div style={{ height: "100vh", width: "100%" }}>
//           <GoogleMapReact
//             bootstrapURLKeys={{
//               key: MAP_API_KEY
//             }}
//             defaultCenter={this.props.center}
//             defaultZoom={this.props.zoom}
//             yesIWantToUseGoogleMapApiInternals
//             onGoogleApiLoaded={({ map, maps }) =>
//               this.handleApiLoaded(map, maps)
//             }
//           >
//             {/* Place map components here to place on map  */}
//             {/* <Marker
//               lat={this.state.user1.center.lat}
//               lng={this.state.user1.center.lng}
//             /> */}
//             <MapMarker
//               lat={this.state.lat}
//               lng={this.state.lng}
//               text="My Marker"
//             />

//             {profileMarkers}
//           </GoogleMapReact>
//         </div>
//       </div>
//     );
//   }
// }

// export default SimpleMap;
