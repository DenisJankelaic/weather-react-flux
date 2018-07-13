import * as React from "react";
import { Container } from "flux/utils";
import { ActionsCreators } from "../actions/action-creators";

import { GeolocationStore } from "../stores/geolocation-store";
import { CityWeatherData } from "../contracts/city-weather-data";
import "./geolocation-view.css";

interface State {
    cityData: CityWeatherData;
    long: number;
    lat: number;
}
class GeolocationContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [GeolocationStore];
    }

    public componentDidMount(): void {
        ActionsCreators.InitGeolocationDispatcher();
    }
    public static calculateState(state: State): State {
        return {
            cityData: GeolocationStore.getState().cityData,
            long: GeolocationStore.getState().long,
            lat: GeolocationStore.getState().lat
        };
    }
    public render(): JSX.Element {
        return (
            <div className="current-location">
                <div className="current-info">
                <div className="current-city">
                <div>{this.state.cityData.city}</div>
                <div>{this.state.cityData.country}</div></div>
                <div>{this.state.cityData.temperature}°</div>
                <div>Wind: {this.state.cityData.wind} m/s</div>
                <div>Humidity: {this.state.cityData.humidity}%</div>
                </div>
            </div>
        );
    }
}
export const GeolocationContainer = Container.create(GeolocationContainerClass);
