import * as React from "react";
import { CityWeatherData } from "../contracts/city-weather-data";
import "./favorite-city-view.css";
export type DeleteClicked = (city: string) => void;
export type SelectCity = (city: CityWeatherData) => void;

interface Props {
    singlecity: CityWeatherData;
    clickDelete: DeleteClicked;
    selectCity: SelectCity;
}

export class FavoriteCity extends React.Component<Props> {

    protected onClickDelete: React.MouseEventHandler<HTMLDivElement> = event => {
        this.props.clickDelete(this.props.singlecity.city);
    }
    protected onSelectCity: React.MouseEventHandler<HTMLDivElement> = event => {
        this.props.selectCity(this.props.singlecity);
    }

    public render(): JSX.Element {
        return (
            <div className="favorite-city"  >
                <div className="text-info" onClick={() => this.props.selectCity(this.props.singlecity)}>
                    <div className="country-city">
                        <div className="city"> {this.props.singlecity.city} </div>
                        <div className="country"> {this.props.singlecity.country} </div>
                    </div>
                    <div className="temperature"> {this.props.singlecity.temperature}°</div>
                </div>
                <div className="button"><img src="https://www.materialui.co/materialIcons/action/highlight_remove_white_192x192.png"
                    onClick={() => this.props.clickDelete(this.props.singlecity.city)} />
                </div>
            </ div>
                );
            }
        }
