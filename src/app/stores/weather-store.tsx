import {
    ReduceStore,
    ActionHandler,
    Abstractions
} from "simplr-flux";

import {
    SubmitActionFailed,
    SubmitActionPending,
    SubmitActionSucceeded,
    GetCountryName,
    GetCityImage,
    ChangeMainWeatherButton
} from "../actions/main-weather-actions/actions";
import { SubmitSelectedCity } from "../actions/city-list-actions/actions";
import { CityWeatherData } from "../contracts/city-weather-contracts";

interface StoreState {
    cityData: CityWeatherData;
    status: Abstractions.ItemStatus;
    selected: boolean;
    cityCountryName: string;
}

class WeatherStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(SubmitActionSucceeded, this.onSubmitActionSucceeded);
        this.registerAction(SubmitActionFailed, this.onSubmitActionFailed);
        this.registerAction(SubmitActionPending, this.onSubmitActionPending);
        this.registerAction(SubmitSelectedCity, this.onSubmitSelectedCity);
        this.registerAction(GetCountryName, this.onGetCountryName);
        this.registerAction(GetCityImage, this.onGetCityImage);
        this.registerAction(ChangeMainWeatherButton, this.onChangeButton);
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
                weather: "",
                lat: 0,
                long: 0,
                index: 0,
                imageArray: [],
                icon: ""
            },
            status: Abstractions.ItemStatus.Init,
            selected: false,
            cityCountryName: "",
        };
    }

    private onSubmitActionSucceeded: ActionHandler<SubmitActionSucceeded, StoreState> = (action, state) =>
        ({
            ...state,
            cityData: {
                ...this.getState().cityData,
                city: action.Data.name,
                country: action.Data.sys.country,
                description: action.Data.weather[0].description,
                humidity: action.Data.main.humidity,
                temperature: action.Data.main.temp,
                wind: action.Data.wind.speed,
                weather: action.Data.weather[0].main,
                lat: action.Data.coord.lat,
                long: action.Data.coord.lon,
                index: action.Data.id,
                icon: action.Data.weather[0].icon
            },
            status: Abstractions.ItemStatus.Loaded,
            selected: false
        })

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
    private onSubmitSelectedCity: ActionHandler<SubmitSelectedCity, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state,
            cityData: action.City,
            status: Abstractions.ItemStatus.Loaded,
            selected: true
        };
        return nextState;
    }
    private onGetCountryName: ActionHandler<GetCountryName, StoreState> = (action, state) =>
        ({
            ...state,
            cityCountryName: action.Country.name
        })
    private onGetCityImage: ActionHandler<GetCityImage, StoreState> = (action, state) =>
        ({
            ...state,
            cityData: {
                ...this.getState().cityData,
                imageArray: action.CityImageArray
            }
        })
    private onChangeButton: ActionHandler<ChangeMainWeatherButton, StoreState> = (action, state) =>
        ({
            ...state,
            selected: false
        })
}

export const WeatherStore = new WeatherStoreClass();
