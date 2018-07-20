import * as React from "react";

import { ActionsCreators } from "../../actions/main-weather-actions/action-creators";

import "./input-view.css";

interface State {
    inputCityName: string;
}

export class InputView extends React.Component<{}, State> {
    public state: State = {
        inputCityName: "",
    };

    protected CityChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        this.setState({
            inputCityName: event.target.value
        });
    };

    protected Submit: React.KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.key === "Enter") {
            this.SubmitCity(this.state.inputCityName);
            this.ResetInput();
        }
    };

    protected async SubmitCity(city: string): Promise<void> {
        if (city.trim().length === 0) {
            alert("Blank input");
        } else {
            ActionsCreators.SubmitAction(city);
        }
    }

    protected ResetInput(): void {
        this.setState({
            inputCityName: ""
        });
    }

    public render(): JSX.Element {
        return (
            <p>
            <span className="input">
                <input
                    onChange={this.CityChange}
                    onKeyPress={this.Submit}
                    placeholder="Write city name here"
                    value={this.state.inputCityName}
                /><span></span>
            </span>
            </p>);
    }
}
