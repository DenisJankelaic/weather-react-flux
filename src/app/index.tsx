import * as React from "react";
import * as ReactDOM from "react-dom";
import { InputView } from "./components/input-view";
import { WeatherView } from "./components/weather-view";

import "./styles/index.css";

class App extends React.Component {

  public render(): JSX.Element {
    return (
      <div className="weather-window">
        {/* <video id="background-video" loop autoPlay>
          <source src="https://storage.googleapis.com/coverr-main/mp4/Flying-Birds.mp4" type="video/mp4" />
          <source src="https://storage.googleapis.com/coverr-main/mp4/Flying-Birds.mp4" type="video/ogg" />
        </video> */}
        <div className="input-view"> <InputView /> </div>
        <div className="weather-data"> <WeatherView /> </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app-root"));
