import { ReduceStore, ActionHandler, Abstractions } from "simplr-flux";
import { CityWeatherData } from "../contracts/city-weather-data";
import {
    InitGeolocation,
    SubmitGeolocation,
    SubmitGeolocationFailed
} from "../actions/geolocation-actions/actions";

interface StoreState {
    cityData: CityWeatherData;
    long: number;
    lat: number;
    status: Abstractions.ItemStatus;
}

class GeolocationStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(InitGeolocation, this.onInitGeolocation);
        this.registerAction(SubmitGeolocation, this.onSubmitGeolocation);
        this.registerAction(SubmitGeolocationFailed, this.onSubmitGeolocationFailed);
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
    private onInitGeolocation: ActionHandler<InitGeolocation, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state,
            long: action.Long,
            lat: action.Lat,
            status: Abstractions.ItemStatus.Loaded
        };
        return nextState;
    }
    private onSubmitGeolocation: ActionHandler<SubmitGeolocation, StoreState> = (action, state) => {
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

    private onSubmitGeolocationFailed: ActionHandler<SubmitGeolocationFailed, StoreState> = (action, state) =>
        ({
            ...state,
            status: Abstractions.ItemStatus.Failed
        })
}
export const GeolocationStore = new GeolocationStoreClass();
