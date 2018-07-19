import { Dispatcher } from "simplr-flux";

import {
    SubmitActionFailed,
    SubmitActionSucceeded,
    SubmitActionPending
} from "./actions";
import {
    SubmitFavorite,
    DeleteFavorite
} from "../city-list-actions/actions";
import { ApiWeatherData } from "../../contracts/weather";
import { API_KEY } from "../../api-key";
import { CityWeatherData } from "../../contracts/city-weather-data";

export namespace ActionsCreators {
    export async function SubmitAction(city: string): Promise<void> {
        Dispatcher.dispatch(new SubmitActionPending());
        // PROBLEM: My catch block doesn't detect failure in fetching.
        // TODO: Ask better option for `try{}catch{}`.
        try {
            const apicall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            if (apicall.status === 200) {
                const data: ApiWeatherData = await apicall.json();
                Dispatcher.dispatch(new SubmitActionSucceeded(data));
            } else {
                Dispatcher.dispatch(new SubmitActionFailed());
            }
        } catch (error) {
            Dispatcher.dispatch(new SubmitActionFailed());
        }
    }

    export function SubmitFavoriteAction(data: CityWeatherData): void {
        Dispatcher.dispatch(new SubmitFavorite(data));
    }

    export function DeleteFavoriteAction(data: string): void {
        Dispatcher.dispatch(new DeleteFavorite(data));
    }
}
