// import * as React from "react";
// import { NavLink } from "react-router-dom";
// import GoogleMapReact from "google-map-react";
// // import { Marker } from "./marker";

// import "./google-map-class.css";

// const AnyReactComponent = ({text}) => <div>{text}</div>;

// export class SimpleMap extends React.PureComponent {
//   // public static defaultProps = {
//   //   center: {
//   //     lat: 59.95,
//   //     lng: 30.33
//   //   },
//   //   zoom: 11
//   // };

//   public render(): JSX.Element {
//     // const mark: Marker = {
//     //   lat: 0,
//     //   lng: 0,
//     //   text: "bbz"
//     // };
//     return (
//       <div className="map-window">
//         <div className="map">
//           <GoogleMapReact
//             bootstrapURLKeys={{ key: "AIzaSyBZpfgmWpYR5pxjBeX7OOKsHIyQCH_uMic" }}
//             defaultCenter={{
//               lat: 54.9,
//               lng: 23.9
//             }}
//             defaultZoom={11}
//           >
//             <AnyReactComponent
//               lat={54.9}
//               lng={23.9}
//               text={"Kaunas"}
//             />
//             {/* {mark}; */}
//           </GoogleMapReact>
//         </div>
//         <div className="button" >
//           <NavLink to="/">
//             <img src="https://image.flaticon.com/icons/svg/54/54906.svg" />
//           </NavLink>
//         </div>
//       </div >
//     );
//   }
// }
