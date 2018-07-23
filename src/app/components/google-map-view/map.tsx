import * as React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import "./map.css";
import { Markers } from "./markerList";
import { NavLink } from "react-router-dom";
import { GeolocationView } from "../geolocation-view";
import { CityWeatherData } from "../../contracts/city-weather-data";
import { mapProps } from "recompose";

// const GOOGLE_MAPS_API_KEY = "AIzaSyBZpfgmWpYR5pxjBeX7OOKsHIyQCH_uMic";
//su propsais perduot markerius
const MapWithAMarker = withScriptjs(withGoogleMap((props: Props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 54.8985, lng: 23.9036 }}
    >
        {props.markers != null ?
            props.markers.map(marker => <Marker key={marker.index} position={{ lat: marker.lat, lng: marker.long }}
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
            ) : null}
    </GoogleMap >
));

interface Props {
    markers?: CityWeatherData[];
}

export class WorldMapView extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    public render(): JSX.Element {
        console.log(this.props.markers);
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
                    // markers= {this.props.markers}
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
