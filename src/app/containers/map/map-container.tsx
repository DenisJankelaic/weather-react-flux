import * as React from "react";
import { Container } from "flux/utils";

import { CityListStore } from "../../stores/citylist-store";
import { CityWeatherData } from "../../contracts/city-weather-data";
import "./city-list-container.css";
import { WorldMapView } from "../../components/google-map-view/map";
import { GeolocationStore } from "../../stores/geolocation-store";

interface State {
    cities: CityWeatherData[];
    currentCity: CityWeatherData;
}

class MapContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [CityListStore, GeolocationStore];
    }

    public static calculateState(state: State): State {
        return {
            cities: [...CityListStore.getState().cities, GeolocationStore.getState().cityData],
            currentCity: GeolocationStore.getState().cityData
        };
    }

    public render(): JSX.Element {
        return (
            <div >
                <WorldMapView
                    markers={this.state.cities}
                    centerCity={this.state.currentCity}
                />
            </div>
        );
    }

}

export const MapContainer = Container.create(MapContainerClass);
