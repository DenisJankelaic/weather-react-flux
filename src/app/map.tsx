import * as React from "react";
import * as ReactDOM from "react-dom";
import { SimpleMap } from "./components/google-map-view/map-view";
// import { BrowserRouter, Switch, Route } from "react-router-dom";

// import "./styles/index.css";

class App extends React.Component {

    public render(): JSX.Element {
        return (
            <div className="main">
                <div style={{ width: "100%", height: "400px" }}>
                    <SimpleMap />
                </div>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById("app-root"));
