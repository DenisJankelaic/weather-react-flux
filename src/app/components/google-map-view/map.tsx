import * as React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { NavLink } from "react-router-dom";

import { GeolocationView } from "../geolocation-view";
import { CityWeatherData } from "../../contracts/city-weather-data";
import { MapStyle } from "./map-style";
import { GM_API_KEY } from "../../shared/api-keys/gm-api-key";

import "./map.css";

const MapWithAMarker = withScriptjs(withGoogleMap((props: Props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: props.centerCity.lat, lng: props.centerCity.long }}
        //TODO: Fix this red line.. somehow. (everything works)
        defaultOptions={{ styles: MapStyle, streetViewControl: false, zoomControl: false, mapTypeControl: false }}
    >
        {props.markers.map(marker => <Marker key={marker.index} position={{ lat: marker.lat, lng: marker.long }}
            icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillOpacity: 1,
                fillColor: "#5DFFFF",
                strokeOpacity: 1,
                strokeWeight: 3,
                strokeColor: "#4E91AA",
                scale: 15,
            }}
            label={{ text: marker.temperature.toFixed(0).toString() }}
        />
        )}
    </GoogleMap >));

interface Props {
    markers: CityWeatherData[];
    centerCity: CityWeatherData;
}

export class WorldMapView extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    public render(): JSX.Element {
        return (
            <div className="map-view">
                <div className="geolocation"><GeolocationView /> </div>
                <div className="map">
                    <MapWithAMarker
                        // tslint:disable-next-line:max-line-length
                        googleMapURL= {`https://maps.googleapis.com/maps/api/js?key=${GM_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: "100%" }} />}
                        containerElement={<div style={{ height: "100%" }} />}
                        mapElement={<div style={{ height: "100%" }} />}
                        markers={this.props.markers}
                        centerCity={this.props.centerCity}
                    >
                    </MapWithAMarker>
                </div>
                <div className="back-button">
                    <NavLink to="/">
                        <img src="https://preview.ibb.co/kV6deT/circled_left.png" />
                    </NavLink>
                </div>
            </div>
        );
    }
}
