import * as React from "react";
import { GeolocationView } from "./geolocation-view";
import { InputView } from "./input-view/input-view";
import { WeatherView } from "./weather-view";
import { CityListView } from "./city-view/citylist-view";
// import { AutoInputView } from "./input-view/bad-input-view";

import "../styles/index.css";
export class WeatherWindowView extends React.Component<{}> {
    public render(): JSX.Element {
        return (
            <div className="weather-window">
                <div className="header">
                    <div className="geolocation-view"><GeolocationView /> </div>
                </div>
                <div className="main">
                    <div className="input-city">
                        <div className="input-view"> <InputView /> </div>
                        <div className="weather-data"> <WeatherView /> </div>
                    </div>
                    <div className="city-list-view"> <CityListView /> </div>
                </div>
            </div>
        );
    }
}
