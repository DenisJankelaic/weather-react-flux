import * as React from "react";
import { Container } from "flux/utils";

import { WeatherStore } from "../stores/weather-store";
import { CityWeatherData } from "../contracts/city-weather-data";
import { Abstractions } from "simplr-flux";

import "./weather-container.css";
import { ActionsCreators } from "../actions/main-weather-actions/action-creators";
interface State {
    cityData: CityWeatherData;
    status: Abstractions.ItemStatus;
    long: number;
    lat: number;
    selected: boolean;
}
class WeatherContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [WeatherStore];
    }
    public static calculateState(state: State): State {
        return {
            cityData: WeatherStore.getState().cityData,
            status: WeatherStore.getState().status,
            long: WeatherStore.getState().long,
            lat: WeatherStore.getState().lat,
            selected: WeatherStore.getState().selected
        };
    }
    protected SubmitFavorite = (): void => {
        ActionsCreators.SubmitFavoriteDispatcher(this.state.cityData);
        this.setState(state => ({
            ...state,
            selected: true
        }));
    }
    protected DeleteCity = (): void => {
        ActionsCreators.DeleteFavoriteDispatcher(this.state.cityData.city);
        this.setState(state => ({
            ...state,
            selected: false
        }));
    }

    public render(): JSX.Element {
        const { cityData, status } = this.state;
        switch (status) {
            case Abstractions.ItemStatus.Loaded: {
                return (
                    <div className="weather">
                        <div className="first-row">
                            <div className="city">
                                {cityData.city} </div>
                            <div className="country">
                                {cityData.country}</div>
                            <div className="desc">
                                {cityData.weather}</div></div>
                        <div className="second-row">
                            <div className="temp">
                                {cityData.temperature}°</div>
                            <div className="right-side">
                                <div className="humidity">
                                    Humidity: {cityData.humidity}%</div>
                                <div className="wind">
                                    Wind: {cityData.wind}m/s</div> </div></div>
                        <div className="third-row">
                            {this.state.selected ?
                                <div className="button" onClick={this.DeleteCity}>Delete from favorites</div> :
                                <div className="button" onClick={this.SubmitFavorite}>Add to favorites</div>}
                        </div>
                    </div>
                );
            }
            case Abstractions.ItemStatus.Failed: {
                return (
                    <div className="pending">
                        <div className="load">
                            <div className="img">
                                <img src=
                                    "http://gifimage.net/wp-content/uploads/2017/01/Excited-GIF-Image-for-Whatsapp-and-Facebook-51.gif" />
                            </div>
                            <div className="text" >Loading failed</div>
                        </div></div>
                );
            }
            case Abstractions.ItemStatus.Init: {
                return (
                    <div className="pending">
                        <div className="load">
                            <div className="img">
                                <img
                                    src="http://www.microcreatives.com/wp-content/uploads/2016/01/animat-pencil-512x512-color.gif?x70538" />
                            </div>
                        </div></div>
                );
            }
            case Abstractions.ItemStatus.Pending: {
                return (
                    <div className="pending">
                        <div className="load">
                            <div className="img">
                                <img src="https://i.pinimg.com/originals/3d/1b/73/3d1b739fb2546948f207d2be7ae1b105.gif" />
                            </div>
                        </div>
                    </div>
                );
            }
            case Abstractions.ItemStatus.NoData: {
                return (
                    <div>
                        No data found
                    </div>
                );
            }
        }
    }
}
export const WeatherContainer = Container.create(WeatherContainerClass);
