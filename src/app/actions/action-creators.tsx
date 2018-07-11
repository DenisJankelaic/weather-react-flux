import { Dispatcher } from "simplr-flux";

import {
    SubmitActionFailed,
    SubmitActionSucceeded,
    SubmitActionPending,
    SetDataAction
} from "./actions";
import { RootObject } from "../contracts/weather";

export namespace ActionsCreators {
    export async function SubmitDispatcher(city: string): Promise<void> {
        const apikey = "02ae0ccb07584d6cb6ea8f321bd743bc";
        Dispatcher.dispatch(new SubmitActionPending());
        // PROBLEM: My catch block doesn't detect failure in fetching.
        // TODO: Ask better option for `try{}catch{}`.
        try {
            const apicall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
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
    export function SetDataDispatcher(data: any): void {
        Dispatcher.dispatch(new SetDataAction(data));
    }
}
