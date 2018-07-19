import { Dispatcher } from "simplr-flux";

import {
    DeleteFavorite,
    DeleteAllFavorites,
    SubmitSelectedCity
} from "./actions";
import { CityWeatherData } from "../../contracts/city-weather-data";

export namespace ActionsCreators {
    export function DeleteFavoriteAction(data: string): void {
        Dispatcher.dispatch(new DeleteFavorite(data));
    }
    export function DeleteAllFavoritesAction(): void {
        Dispatcher.dispatch(new DeleteAllFavorites());
    }
    export function SendSelectedCityAction(data: CityWeatherData): void {
        Dispatcher.dispatch(new SubmitSelectedCity(data));
    }
}
