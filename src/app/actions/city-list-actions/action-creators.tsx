import { Dispatcher } from "simplr-flux";

import {
    DeleteFavorite,
    DeleteAllFavorites,
    SubmitSelectedCity
} from "./actions";
import { CityWeatherData } from "../../contracts/city-weather-data";
import { ChangeSelectionState, ChangeState } from "../main-weather-actions/actions";

export namespace ActionsCreators {
    export function DeleteFavoriteDispatcher(data: string): void {
        Dispatcher.dispatch(new DeleteFavorite(data));
        Dispatcher.dispatch(new ChangeSelectionState(data));
    }
    export function DeleteAllFavoritesDispatcher(): void {
        Dispatcher.dispatch(new DeleteAllFavorites());
        Dispatcher.dispatch(new ChangeState());
    }
    export function SendSelectedCityDispatcher(data: CityWeatherData): void {
        Dispatcher.dispatch(new SubmitSelectedCity(data));
    }
}
