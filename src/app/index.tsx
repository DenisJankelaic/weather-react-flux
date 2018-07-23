import * as React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { WeatherWindowView } from "./components/weather-window-view";
import { WorldMapView } from "./components/google-map-view/map";

import "./styles/index.css";

class App extends React.Component {

  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={WeatherWindowView} />
          <Route exact
          path="/map"
          render={props => <WorldMapView {...props} markers={true}/>}
          // component={WorldMapView}
          />
          </Switch>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app-root"));
