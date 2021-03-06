import { Dispatcher } from "simplr-flux";

import {
    SubmitActionFailed,
    SubmitActionSucceeded,
    SubmitActionPending,
    GetCountryName,
    GetCountryNameActionFailed
} from "./actions";
import {
    SubmitFavorite,
    DeleteFavorite
} from "../city-list-actions/actions";
import { ApiWeatherData } from "../../contracts/weather";
import { API_KEY } from "../../api-key";
import { CityWeatherData } from "../../contracts/city-weather-data";
import { CountryData } from "../../contracts/country";

export namespace ActionsCreators {
    export async function SubmitAction(city: string): Promise<void> {
        Dispatcher.dispatch(new SubmitActionPending());
        // PROBLEM: My catch block doesn't detect failure in fetching.
        // TODO: Ask better option for `try{}catch{}`.
        try {
            const weatherapicall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            if (weatherapicall.status === 200) {
                const data: ApiWeatherData = await weatherapicall.json();
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

    export async function GetCountryNameAction(countryCode: string): Promise<void>  {
        try {
            const cityapicall = await fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
            if (cityapicall.status === 200) {
                const countryData: CountryData = await cityapicall.json();
                Dispatcher.dispatch(new GetCountryName(countryData));
            } else {
                Dispatcher.dispatch(new GetCountryNameActionFailed());
            }
        } catch (error) {
            Dispatcher.dispatch(new GetCountryNameActionFailed());
        }
    }

}
