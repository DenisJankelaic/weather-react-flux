import { Dispatcher } from "simplr-flux";

import {
    DeleteFavorite,
    DeleteAllFavorites,
    SubmitSelectedCity
} from "./actions";
import { CityWeatherData } from "../../contracts/city-weather-data";
import { ChangeSelectionState } from "../main-weather-actions/actions";

export namespace ActionsCreators {
    export function DeleteFavoriteDispatcher(data: string): void {
        Dispatcher.dispatch(new DeleteFavorite(data));
        Dispatcher.dispatch(new ChangeSelectionState());
    }
    export function DeleteAllFavoritesDispatcher(): void {
        Dispatcher.dispatch(new DeleteAllFavorites());
        Dispatcher.dispatch(new ChangeSelectionState());
    }
    export function SendSelectedCityDispatcher(data: CityWeatherData): void {
        Dispatcher.dispatch(new SubmitSelectedCity(data));
    }
}
