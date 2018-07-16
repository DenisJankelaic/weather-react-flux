import { Dispatcher } from "simplr-flux";

import {
    SubmitActionFailed,
    SubmitActionSucceeded,
    SubmitActionPending,
    ChangeSelectionState
} from "./actions";
import {
    SubmitFavorite, SubmitSelectedCity
} from "../city-list-actions/actions";

import { RootObject } from "../../contracts/weather";
import { API_KEY } from "../../api-key";
import { CityWeatherData } from "../../contracts/city-weather-data";
import { DeleteFavorite } from "../city-list-actions/actions";

export namespace ActionsCreators {
    export async function SubmitDispatcher(city: string): Promise<void> {
        Dispatcher.dispatch(new SubmitActionPending());
        // PROBLEM: My catch block doesn't detect failure in fetching.
        // TODO: Ask better option for `try{}catch{}`.
        try {
            const apicall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            if (apicall.status === 200) {
                const data: RootObject = await apicall.json();
                Dispatcher.dispatch(new SubmitActionSucceeded(data));
            } else {
                Dispatcher.dispatch(new SubmitActionFailed());
            }
        } catch (error) {
            Dispatcher.dispatch(new SubmitActionFailed());
        }
    }

    export function SubmitFavoriteDispatcher(data: CityWeatherData): void {
        Dispatcher.dispatch(new SubmitFavorite(data));
    }

    export function DeleteFavoriteDispatcher(data: string): void {
        Dispatcher.dispatch(new DeleteFavorite(data));
        Dispatcher.dispatch(new ChangeSelectionState());
    }
    export function SendSelectedCityDispatcher(data: CityWeatherData): void {
        Dispatcher.dispatch(new SubmitSelectedCity(data));
    }
}
