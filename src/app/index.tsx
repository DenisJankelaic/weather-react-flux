import * as React from "react";
import * as ReactDOM from "react-dom";

import { InputView } from "./components/input-view/input-view";
import { WeatherView } from "./components/weather-view";
import { GeolocationView } from "./components/geolocation-view";
import { CityListView } from "./components/city-view/citylist-view";

import "./styles/index.css";

class App extends React.Component {

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
ReactDOM.render(<App />, document.getElementById("app-root"));
