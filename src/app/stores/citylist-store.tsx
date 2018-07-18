import { ReduceStore, ActionHandler, Dispatcher } from "simplr-flux";

import { CityWeatherData } from "../contracts/city-weather-data";
import {
    SubmitFavorite,
    DeleteFavorite,
    DeleteAllFavorites
} from "../actions/city-list-actions/actions";
import { InitGeolocation } from "../actions/geolocation-actions/actions";

interface StoreState {
    cities: CityWeatherData[];
    currentlat: number;
    currentlong: number;
}

class CityListStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(SubmitFavorite, this.onSubmitFavorite);
        this.registerAction(DeleteFavorite, this.onDeleteFavorite);
        this.registerAction(DeleteAllFavorites, this.onDeleteAllFavorites);
        this.registerAction(InitGeolocation, this.onInitGeolocation);
    }
    public getInitialState(): StoreState {
        return {
            cities: [],
            currentlat: 0,
            currentlong: 0
        };
    }
    private onSubmitFavorite: ActionHandler<SubmitFavorite, StoreState> = (action, state) => {
        const newCity: CityWeatherData = action.Data;
        if (state.cities.some(x => (x.city === newCity.city))) {
            alert("This city is already in your favorite!");
            return;
        } else if (newCity.lat.toFixed(1) === state.currentlat.toFixed(1) && newCity.long.toFixed(1) === state.currentlong.toFixed(1)) {
            alert("This is your current location. No need to add it to favorites!");
            return;
        } else {
            if (state.cities.length >= 10) {
                alert("Your favorite list is full!");
                return;
            }
            const nextState: StoreState = {
                ...state,
                cities: [...state.cities, newCity]
            };
            return nextState;
        }
    };
    private onDeleteFavorite: ActionHandler<DeleteFavorite, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state
        };
        for (let i = 0; i < nextState.cities.length; i++) {
            if (nextState.cities[i].city === action.City) {
                nextState.cities.splice(i, 1);
            }
        }
        return {
            ...state,
            cities: [...nextState.cities],
        };
    }
    private onInitGeolocation: ActionHandler<InitGeolocation, StoreState> = (action, state) =>
        ({
            ...state,
            currentlat: action.Lat,
            currentlong: action.Long
        })
    private onDeleteAllFavorites: ActionHandler<DeleteAllFavorites, StoreState> = (action, state) => {
        if (confirm("Are you sure you want to clear favorite list?")) {
            const nextState: StoreState = {
                ...state
            };
            nextState.cities.splice(0, nextState.cities.length);
            return {
                ...state,
                cities: [...nextState.cities]
            };
        } else {
            return;
        }
    }
}
export const CityListStore = new CityListStoreClass();
