import { CityWeatherData } from "../../contracts/city-weather-data";

export class SubmitFavorite {
    constructor(private data: CityWeatherData) {
    }
    public get Data(): CityWeatherData {
        return this.data;
    }
}
export class DeleteFavorite {
    constructor(private city: string) {
    }
    public get City(): string {
        return this.city;
    }
}
export class DeleteAllFavorites { }

export class SubmitSelectedCity {
    constructor(private city: CityWeatherData) {
    }
    public get City(): CityWeatherData {
        return this.city;
    }
}
