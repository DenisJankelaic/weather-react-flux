import * as React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { withProps, compose } from "recompose";

import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import Marker from "react-google-maps/lib/components/Marker";

import { demoMapStyle } from "./map-style";
import { Markers } from "./markerList";

const GOOGLE_MAPS_API_KEY = "AIzaSyCUfG5xqkrkJp4s_2nPnPNPPd3FfASE-sI";

const MyMapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: "100%" }} />,
        containerElement: <div style={{ width: "100%", height: "100%" }} />,
        mapElement: <div style={{ height: "100%" }} />
    }),
    withScriptjs,
    withGoogleMap
)((_props: any) => (
    <GoogleMap defaultZoom={7} center={{ lat: 55.1694, lng: 23.8813 }} {...{ styles: demoMapStyle }}>
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
            {Markers.map(marker =>
                <Marker key={marker.index} position={{ lat: marker.latitude, lng: marker.longitude }} />)}
        </MarkerClusterer>
    </GoogleMap>
));

interface Props {
    markers?: JSX.Element[];
}

export class WorldMapView extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <div className="world-map-view">
                {this.props.children}
                <MyMapComponent >{this.props.markers}</MyMapComponent>
            </div>
        );
    }
}
