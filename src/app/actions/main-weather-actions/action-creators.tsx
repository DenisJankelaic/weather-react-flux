import { Dispatcher } from "simplr-flux";
import {
    SubmitActionFailed,
    SubmitActionSucceeded,
    SubmitActionPending,
    GetCountryName,
    GetCountryNameActionFailed,
    GetCityImage
} from "./actions";
import {
    SubmitFavorite,
    DeleteFavorite
} from "../city-list-actions/actions";

import { ApiWeatherData } from "../../contracts/weather";
import { CityWeatherData } from "../../contracts/city-weather-contracts";
import { CountryData } from "../../contracts/country";
import { ApiSearchData } from "../../contracts/city-api-search-contracts";

import { WEATHER_API_KEY } from "../../shared/api-keys/weather-api-key";
import { GOOGLE_SEARCH_API_KEY } from "../../shared/api-keys/gs-api-key";
import { GOOGLE_SEARCH_ENGINE_ID } from "../../shared/api-keys/gs-engine-id";

export namespace ActionsCreators {
    export async function SubmitAction(city: string): Promise<void> {
        Dispatcher.dispatch(new SubmitActionPending());
        // PROBLEM: My catch block doesn't detect failure in fetching.
        // TODO: Ask better option for `try{}catch{}`.
        try {
            // tslint:disable-next-line:max-line-length
            const weatherapicall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
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
    export async function GetCityImageAction(city: string): Promise<void> {
        // tslint:disable-next-line:max-line-length
        const searchapicall = await fetch(`https://www.googleapis.com/customsearch/v1?cx=${GOOGLE_SEARCH_ENGINE_ID}&key=${GOOGLE_SEARCH_API_KEY}&imgSize=xxLarge&imgType=photo&searchType=image&q=${city}%20City`);
        const searchdata: ApiSearchData = await searchapicall.json();

        Dispatcher.dispatch(new GetCityImage(searchdata.items));
    }
    export function SubmitFavoriteAction(data: CityWeatherData): void {
        Dispatcher.dispatch(new SubmitFavorite(data));
    }

    export function DeleteFavoriteAction(data: string): void {
        Dispatcher.dispatch(new DeleteFavorite(data));
    }

    export async function GetCountryNameAction(countryCode: string): Promise<void> {
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
