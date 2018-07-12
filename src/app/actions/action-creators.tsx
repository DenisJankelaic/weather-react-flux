import { Dispatcher } from "simplr-flux";

import {
    SubmitActionFailed,
    SubmitActionSucceeded,
    SubmitActionPending,
    InitGeolocation
} from "./actions";
import { RootObject } from "../contracts/weather";
import { API_KEY } from "../api-key";

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
        });
    }
}
