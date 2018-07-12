import { ReduceStore, ActionHandler, Abstractions } from "simplr-flux";
import {
    SubmitActionFailed,
    SubmitActionPending,
    SubmitActionSucceeded,
    InitGeolocation
} from "../actions/actions";
import { CityWeatherData } from "../contracts/city-weather-data";

interface StoreState {
    cityData: CityWeatherData;
    long: number;
    lat: number;
    status: Abstractions.ItemStatus;
}

class WeatherStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(SubmitActionSucceeded, this.onSubmitActionSucceeded);
        this.registerAction(SubmitActionFailed, this.onSubmitActionFailed);
        this.registerAction(SubmitActionPending, this.onSubmitActionPending);
        this.registerAction(InitGeolocation, this.onInitGeolocation);
    }
    public getInitialState(): StoreState {
        return {
            cityData: {
                city: "",
                country: "",
                temperature: 0,
                humidity: 0,
                wind: 0,
                description: "",
                weather: ""
            },
            long: 0,
            lat: 0,
            status: Abstractions.ItemStatus.Init
        };
    }

    private onSubmitActionSucceeded: ActionHandler<SubmitActionSucceeded, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state,
            cityData: {
                city: action.Data.name,
                country: action.Data.sys.country,
                description: action.Data.weather[0].description,
                humidity: action.Data.main.humidity,
                temperature: action.Data.main.temp,
                wind: action.Data.wind.speed,
                weather: action.Data.weather[0].main
            },
            status: Abstractions.ItemStatus.Loaded
        };
        return nextState;
    }

    private onSubmitActionFailed: ActionHandler<SubmitActionFailed, StoreState> = (action, state) =>
        ({
            ...state,
            status: Abstractions.ItemStatus.Failed
        })
    private onSubmitActionPending: ActionHandler<SubmitActionPending, StoreState> = (action, state) =>
        ({
            ...state,
            status: Abstractions.ItemStatus.Pending
        })
    private onInitGeolocation: ActionHandler<InitGeolocation, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state,
            long: action.Long,
            lat: action.Lat
        };
        return nextState;
    }
}
export const WeatherStore = new WeatherStoreClass();
