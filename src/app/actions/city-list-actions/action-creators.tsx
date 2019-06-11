import { Dispatcher } from "simplr-flux";

import {
    DeleteFavorite,
    DeleteAllFavorites,
    SubmitSelectedCity
} from "./actions";
import { CityWeatherData } from "../../contracts/city-weather-data";
import { ChangeMainWeatherButton } from "../main-weather-actions/actions";

export namespace ActionsCreators {
    export function DeleteFavoriteAction(data: string): void {
        Dispatcher.dispatch(new DeleteFavorite(data));
        Dispatcher.dispatch(new ChangeMainWeatherButton());
    }
    export function DeleteAllFavoritesAction(): void {
        Dispatcher.dispatch(new DeleteAllFavorites());
        Dispatcher.dispatch(new ChangeMainWeatherButton());
    }
    export function SendSelectedCityAction(data: CityWeatherData): void {
        Dispatcher.dispatch(new SubmitSelectedCity(data));
    }
}
