import * as React from "react";
import { Abstractions } from "simplr-flux";
import { Container } from "flux/utils";

import { ActionsCreators } from "../../actions/geolocation-actions/action-creators";
import { GeolocationStore } from "../../stores/geolocation-store";
import { CityWeatherData } from "../../contracts/city-weather-contracts";

import "./geolocation-view.css";

interface State {
    cityData: CityWeatherData;
    long: number;
    lat: number;
    status: Abstractions.ItemStatus;
}
class GeolocationContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [GeolocationStore];
    }

    public componentDidMount(): void {
        ActionsCreators.InitGeolocationAction();
    }
    public static calculateState(state: State): State {
        return {
            cityData: GeolocationStore.getState().cityData,
            long: GeolocationStore.getState().long,
            lat: GeolocationStore.getState().lat,
            status: GeolocationStore.getState().status
        };
    }
    public render(): JSX.Element {
        const { cityData, status } = this.state;
        switch (status) {
            case Abstractions.ItemStatus.Loaded: {
                return (
                    <div className="header">
                        <div className="current-location">
                            <div className="current-info">
                                <div className="current-city">
                                    <div>{cityData.city}</div>
                                    <div>{cityData.country}</div></div>
                                <div>{cityData.temperature}°</div>
                                <div>Wind: {cityData.wind} m/s</div>
                                <div>Humidity: {cityData.humidity}%</div>
                            </div>
                        </div>
                    </div>
                );
            }
            case Abstractions.ItemStatus.Init: {
                return (
                    <div className="header">
                        <div className="pending">
                            <div className="load">
                                <div className="img">
                                    <img src="https://i.pinimg.com/originals/3d/1b/73/3d1b739fb2546948f207d2be7ae1b105.gif" />
                                </div>
                            </div></div>
                    </div>
                );
            }
            case Abstractions.ItemStatus.Failed: {
                return (
                    <div className="header">
                        <div className="Failed">
                            <img src="http://www.jmkxyy.com/failed-icon/failed-icon-22.jpg" />
                        </div>
                    </div>
                );
            }
            default: {
                return (
                    <div> Unable to receive location </div >
                );
            }
        }
    }
}
export const GeolocationContainer = Container.create(GeolocationContainerClass);
