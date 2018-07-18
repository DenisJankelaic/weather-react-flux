import * as React from "react";
import * as ReactDOM from "react-dom";

// import { InputView } from "./components/input-view/input-view";
// import { WeatherView } from "./components/weather-view";
// import { GeolocationView } from "./components/geolocation-view";
// import { CityListView } from "./components/city-view/citylist-view";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { SimpleMap } from "./components/google-map-view/map-view";

import "./styles/index.css";
// import { MapView } from "./components/google-map-view/map-view";
import { WeatherWindowView } from "./components/weather-window-view";
// import { WorldMapView } from "./components/google-map-view/test/map";

class App extends React.Component {

  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={WeatherWindowView} />
          {/* <Route exact path="/map" component={WorldMapView} /> */}
          </Switch>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app-root"));
