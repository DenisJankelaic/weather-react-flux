import * as React from "react";
import { Container } from "flux/utils";

import { CityListStore } from "../../stores/citylist-store";
import { CityWeatherData } from "../../contracts/city-weather-data";
import "./city-list-container.css";
import { WorldMapView } from "../../components/google-map-view/map";

interface State {
    cities: CityWeatherData[];
}

class MapContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [CityListStore];
    }

    public static calculateState(state: State): State {
        return {
            cities: CityListStore.getState().cities
        };
    }
    public render(): JSX.Element {
        return (
            <div >
                <WorldMapView
                    markers={this.state.cities}
                />
            </div>
        );
    }

}

export const MapContainer = Container.create(MapContainerClass);
