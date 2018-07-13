import { Dispatcher } from "simplr-flux";

import {
    SubmitActionFailed,
    SubmitActionSucceeded,
    SubmitActionPending,
    InitGeolocation,
    SubmitGeolocation,
    SubmitFavorite,
    DeleteFavorite,
    DeleteAllFavorites
} from "./actions";
import { RootObject } from "../contracts/weather";
import { API_KEY } from "../api-key";
import { CityWeatherData } from "../contracts/city-weather-data";

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

    export async function InitGeolocationDispatcher():  Promise<void> {
        await navigator.geolocation.getCurrentPosition(position => {
            Dispatcher.dispatch(new InitGeolocation(position.coords.longitude, position.coords.latitude));
            ActionsCreators.SubmitGeolocationDispatcher(position.coords.longitude, position.coords.latitude);
        });
    }

    export async function SubmitGeolocationDispatcher(long: number, lat: number):  Promise<void> {
        try {
            const longitude = long.toFixed(1);
            const latitude = lat.toFixed(1);
            const apicall = await
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            if (apicall.status === 200) {
                const data: RootObject = await apicall.json();
                Dispatcher.dispatch(new SubmitGeolocation(data));
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
    }
    export function DeleteAllFavoritesDispatcher(): void {
        Dispatcher.dispatch(new DeleteAllFavorites());
    }
}
