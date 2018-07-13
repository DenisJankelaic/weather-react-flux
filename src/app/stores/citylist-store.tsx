import { ReduceStore, ActionHandler } from "simplr-flux";
import { CityWeatherData } from "../contracts/city-weather-data";
import {
    SubmitFavorite,
    DeleteFavorite,
    DeleteAllFavorites
} from "../actions/actions";

interface StoreState {
    cities: CityWeatherData[]
}

class CityListStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(SubmitFavorite, this.onSubmitFavorite);
        this.registerAction(DeleteFavorite, this.onDeleteFavorite);
        this.registerAction(DeleteAllFavorites, this.onDeleteAllFavorites);
    }
    public getInitialState(): StoreState {
        return {
            cities: []
        };
    }
    private onSubmitFavorite: ActionHandler<SubmitFavorite, StoreState> = (action, state) => {
        const newCity: CityWeatherData = action.Data;

        if (state.cities.some(x => (x.city === newCity.city))) {
            alert("This city is already in your favorite!");
            return;
        } else {
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
            cities: [...nextState.cities]
        };
    }
    private onDeleteAllFavorites: ActionHandler<DeleteAllFavorites, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state
        };
        nextState.cities.splice(0, nextState.cities.length);

        return {
            ...state,
            cities: [...nextState.cities]
        };
    }
}
export const CityListStore = new CityListStoreClass();
