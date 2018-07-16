import { ReduceStore, ActionHandler, Abstractions } from "simplr-flux";
import {
    SubmitActionFailed,
    SubmitActionPending,
    SubmitActionSucceeded,
    InitGeolocation,
    ChangeSelectionState,
    ChangeState
} from "../actions/main-weather-actions/actions";
import {
    SubmitSelectedCity
} from "../actions/city-list-actions/actions";
import { CityWeatherData } from "../contracts/city-weather-data";
import { Store } from "../../../node_modules/@types/flux/utils";

interface StoreState {
    cityData: CityWeatherData;
    long: number;
    lat: number;
    status: Abstractions.ItemStatus;
    selected: boolean;
}

class WeatherStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(SubmitActionSucceeded, this.onSubmitActionSucceeded);
        this.registerAction(SubmitActionFailed, this.onSubmitActionFailed);
        this.registerAction(SubmitActionPending, this.onSubmitActionPending);
        this.registerAction(InitGeolocation, this.onInitGeolocation);
        this.registerAction(SubmitSelectedCity, this.onSubmitSelectedCity);
        this.registerAction(ChangeSelectionState, this.onChangeSelectionState);
        this.registerAction(ChangeState, this.onChangeState);
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
            status: Abstractions.ItemStatus.Init,
            selected: false
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
            status: Abstractions.ItemStatus.Loaded,
            selected: false
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
    private onSubmitSelectedCity: ActionHandler<SubmitSelectedCity, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state,
            cityData: action.City,
            status: Abstractions.ItemStatus.Loaded,
            selected: true
        };
        return nextState;
    }
    private onChangeSelectionState: ActionHandler<ChangeSelectionState, StoreState> = (action, state) => {
        if (state.cityData.city === action.City) {
            const nextState: StoreState = {
                ...state,
                cityData: {
                    ...state.cityData,
                    city: action.City
                },
                selected: false
            };
            return nextState;
        } else {
            return state;
        }

    }
    private onChangeState: ActionHandler<ChangeState, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state,
            cityData: {
                ...state.cityData,
            },
            selected: false
        };
        return nextState;
    }
}

export const WeatherStore = new WeatherStoreClass();
