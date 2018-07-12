import * as React from "react";
import { WeatherContainer } from "../containers/weather-container";

export class WeatherView extends React.Component<{}> {
    public render(): JSX.Element {
        return (
            <WeatherContainer />
        );
    }
}
