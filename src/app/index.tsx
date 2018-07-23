import * as React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { WeatherWindowView } from "./components/weather-window-view";

import "./styles/index.css";
import { MapContainer } from "./containers/map/map-container";

class App extends React.Component {

  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={WeatherWindowView} />
          <Route exact
          path="/map"
          component={MapContainer}
          />
          </Switch>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app-root"));
