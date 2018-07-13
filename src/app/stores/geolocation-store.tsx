import { ReduceStore, ActionHandler } from "simplr-flux";
import { CityWeatherData } from "../contracts/city-weather-data";
import {
    InitGeolocation, SubmitGeolocation
} from "../actions/actions";

interface StoreState {
    cityData: CityWeatherData;
    long: number;
    lat: number;
}

class GeolocationStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(InitGeolocation, this.onInitGeolocation);
        this.registerAction(SubmitGeolocation, this.onSubmitGeolocation);
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
            lat: 0
        };
    }
    private onInitGeolocation: ActionHandler<InitGeolocation, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state,
            long: action.Long,
            lat: action.Lat
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
        };
        return nextState;
    }

}
export const GeolocationStore = new GeolocationStoreClass();
