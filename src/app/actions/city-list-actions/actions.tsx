import { CityWeatherData } from "../../contracts/city-weather-data";

export class SubmitFavorite {
    constructor(private CityData: CityWeatherData) {
    }
    public get Data(): CityWeatherData {
        return this.CityData;
    }
}
export class DeleteFavorite {
    constructor(private cityName: string) {
    }
    public get City(): string {
        return this.cityName;
    }
}

export class SubmitSelectedCity {
    constructor(private cityWeatherData: CityWeatherData) {
    }
    public get City(): CityWeatherData {
        return this.cityWeatherData;
    }
}

export class DeleteAllFavorites { }
