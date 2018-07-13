import { RootObject } from "../contracts/weather";
import { CityWeatherData } from "../contracts/city-weather-data";

export class SubmitActionSucceeded {
    constructor(private data: RootObject) {
    }
    public get Data(): RootObject {
        return this.data;
    }
}
export class SubmitGeolocation {
    constructor(private data: RootObject) {
    }
    public get Data(): RootObject {
        return this.data;
    }
}
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
export class SubmitActionFailed { }
export class SubmitActionPending { }
export class DeleteAllFavorites { }
export class InitGeolocation {
    constructor(private long: number, private lat: number) { }
    public get Long(): number {
        return this.long;
    }
    public get Lat(): number {
        return this.lat;
    }
 }
