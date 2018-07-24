import * as React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "flux/utils";

import { CityListStore } from "../../stores/citylist-store";
import { CityWeatherData } from "../../contracts/city-weather-data";
import {
    DeleteClicked,
    FavoriteCity,
    SelectCity
} from "../../components/city-view/favorite-city-view";
import { ActionsCreators } from "../../actions/city-list-actions/action-creators";

import "./city-list-container.css";
import { GeolocationStore } from "../../stores/geolocation-store";

interface State {
    cities: CityWeatherData[];
}

class CityListContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [CityListStore, GeolocationStore];
    }

    public static calculateState(state: State): State {
        return {
            cities: CityListStore.getState().cities
        };
    }
    protected onDeleteCity: DeleteClicked = city => {
        ActionsCreators.DeleteFavoriteAction(city);
    };
    protected onSelectCity: SelectCity = city => {
        ActionsCreators.SendSelectedCityAction(city);
    };
    protected onDeleteAll = () => {
        ActionsCreators.DeleteAllFavoritesAction();
    }
    public render(): JSX.Element {
        switch (this.state.cities.length !== 0) {
            case true: {
                return (
                    <div className="city-list">
                        <div className="single-city">
                            {this.state.cities.map((city, i) =>
                                (
                                    <FavoriteCity
                                        key={i}
                                        singlecity={city}
                                        clickDelete={this.onDeleteCity}
                                        selectCity={this.onSelectCity}
                                    />
                                ))}
                        </div>
                        <div className="delete-all" >
                            <div className="button" onClick={this.onDeleteAll}>
                                <img src="https://www.freeiconspng.com/uploads/trash-can-icon-21.png" />
                            </div>
                            <div className="button" >
                                <NavLink to="/map" >
                                    <img src="https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/355/original/map.png?1510933432" />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                );
            }
            case false: {
                return (
                    <div></div>
                );
            }

        }

    }
}
export const CityListContainer = Container.create(CityListContainerClass);
