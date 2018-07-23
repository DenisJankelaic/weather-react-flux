import * as React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import "./map.css";
import { Markers } from "./markerList";
import { NavLink } from "react-router-dom";
import { GeolocationView } from "../geolocation-view";
import { CityWeatherData } from "../../contracts/city-weather-data";

// const GOOGLE_MAPS_API_KEY = "AIzaSyBZpfgmWpYR5pxjBeX7OOKsHIyQCH_uMic";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 54.8985, lng: 23.9036 }}
    >
        {Markers.map(marker => <Marker key={marker.index} position={{ lat: marker.latitude, lng: marker.longitude }}
            icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillOpacity: 1,
                fillColor: "#5DFFFF",
                strokeOpacity: 1,
                strokeWeight: 3,
                strokeColor: "#1B4141",
                scale: 15,
            }}
            label={{ text: "25" }}
        />
        )}
    </GoogleMap >
));

interface Props {
    markers?: CityWeatherData[];
}

export class WorldMapView extends React.Component<Props> {
    constructor(props) {
        super(props);
    }
    public render(): JSX.Element {
        return (
            <div className="map-view">
                <div className="geolocation"><GeolocationView /> </div>
                <div className="map">
                    <MapWithAMarker
                        googleMapURL=
                        // tslint:disable-next-line:max-line-length
                        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBZpfgmWpYR5pxjBeX7OOKsHIyQCH_uMic&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: "100%" }} />}
                        containerElement={<div style={{ height: "100%" }} />}
                        mapElement={<div style={{ height: "100%" }} />}
                    >
                        {this.props.markers}
                    </MapWithAMarker>
                </div>
                <div className="back-button">
                    <NavLink to="/">
                        <img src="https://png.icons8.com/metro/1600/circled-left.png" />
                    </NavLink>
                </div>
            </div>
        );
    }
}
