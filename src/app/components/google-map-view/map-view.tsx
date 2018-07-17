import * as React from "react";
import GoogleMapReact from "google-map-react";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// interface Center {
//   center: {
//     lat: number,
//     lng: number
//   };
//   zoom: number;
// }

export class SimpleMap extends React.Component {
  // public static Props: Center = {
  //   center: {
  //     lat: 54.9,
  //     lng: 23.9
  //   },
  //   zoom: 11
  // };

  // constructor(props) {
  //   super(props);
  // }
  public render(): JSX.Element {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBZpfgmWpYR5pxjBeX7OOKsHIyQCH_uMic" }}
          defaultCenter={{
            lat: 54.9,
            lng: 23.9
          }}
          defaultZoom={11}
        >
        </GoogleMapReact>
      </div >
    );
  }
}
