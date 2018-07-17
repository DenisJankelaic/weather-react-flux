import { Dispatcher } from "simplr-flux";

import {
    InitGeolocation,
    SubmitGeolocation,
    SubmitGeolocationFailed
} from "./actions";
import { RootObject } from "../../contracts/weather";
import { API_KEY } from "../../api-key";

export namespace ActionsCreators {

    export async function InitGeolocationAction(): Promise<void> {
        await navigator.geolocation.getCurrentPosition(position => {
            // Dispatching initial coordinates.
            Dispatcher.dispatch(new InitGeolocation(position.coords.longitude, position.coords.latitude));

            // Requesting weather information on geolocation initially.
            ActionsCreators.SubmitGeolocationAction(position.coords.longitude, position.coords.latitude);

            // Setting an interval to refresh weather data in intervals.
            setInterval(() => ActionsCreators.SubmitGeolocationAction(position.coords.longitude, position.coords.latitude), 10000);
        });
    }
    export async function SubmitGeolocationAction(long: number, lat: number): Promise<void> {
        try {
            const longitude = long.toFixed(1);
            const latitude = lat.toFixed(1);
            const apicall = await
                fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            if (apicall.status === 200) {
                const data: RootObject = await apicall.json();
                Dispatcher.dispatch(new SubmitGeolocation(data));
            } else {
                Dispatcher.dispatch(new SubmitGeolocationFailed());
            }
        } catch (error) {
            Dispatcher.dispatch(new SubmitGeolocationFailed());
        }
    }
}
