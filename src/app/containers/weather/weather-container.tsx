import * as React from "react";
import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";

import { WeatherStore } from "../../stores/weather-store";
import { CityWeatherData } from "../../contracts/city-weather-data";
import { ActionsCreators } from "../../actions/main-weather-actions/action-creators";
import { CityListStore } from "../../stores/citylist-store";

import "./weather-container.css";

interface State {
    cityData: CityWeatherData;
    status: Abstractions.ItemStatus;
    selected: boolean;
    cityList: CityWeatherData[];
    cityCountry: string;
}

class WeatherContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [WeatherStore, CityListStore];
    }
    public static calculateState(state: State): State {
        return {
            ...state,
            cityData: WeatherStore.getState().cityData,
            status: WeatherStore.getState().status,
            selected: WeatherStore.getState().selected,
            cityList: CityListStore.getState().cities,
            cityCountry: WeatherStore.getState().cityCountryName
        };
    }
    protected SubmitFavorite = (): void => {
        ActionsCreators.SubmitFavoriteAction(this.state.cityData);
        this.componentDidUpdate();
    }
    public componentDidUpdate(): void {
        if (this.state.cityList.some(x => (x.city === this.state.cityData.city))) {
            this.setState(state => ({
                ...state,
                selected: true
            }));
        }
    }
    protected DeleteCity = (): void => {
        ActionsCreators.DeleteFavoriteAction(this.state.cityData.city);
        this.setState(state => ({
            ...state,
            selected: false
        }));
    }
    protected GetCountryName = (): void => {
        ActionsCreators.GetCountryNameAction(this.state.cityData.country);
    }
    public render(): JSX.Element {
        this.GetCountryName();
        const { cityData, status } = this.state;
        switch (status) {
            case Abstractions.ItemStatus.Loaded: {
                return (
                    <div className="weather" >
                        <div className="hujik">
                            <img src={cityData.url} /> </div>
                        <div className="container">
                            <div className="first-row">
                                <div className="city">
                                    {cityData.city.toLocaleUpperCase()} </div>
                                <div className="desc">
                                    {cityData.description.toLocaleUpperCase()}</div></div>
                            <div className="second-row">
                                <div className="left-side">
                                    <div className="temp">
                                        {cityData.temperature}°
                                    </div>
                                    <div className="desc">
                                        {cityData.weather.toLocaleUpperCase()}</div>
                                    <div className="bottom-data">
                                        <div className="humidity">
                                            <div> HUMIDITY </div>
                                            <div>{cityData.humidity}%</div>
                                        </div>
                                        <div className="wind">
                                            <div>WIND</div>
                                            <div> {cityData.wind}M/S </div></div>
                                    </div>
                                </div>
                                <div className="right-side">
                                    <div className="country">
                                        {this.state.cityCountry.toLocaleUpperCase()}</div>
                                </div>
                            </div>
                            <div className="third-row">
                                {this.state.selected ?
                                    <div className="button" onClick={this.DeleteCity}>Delete from favorites</div> :
                                    <div className="button" onClick={this.SubmitFavorite}>Add to favorites</div>}
                            </div>
                        </div >
                    </div >
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
