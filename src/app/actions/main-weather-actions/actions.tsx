import { ApiWeatherData } from "../../contracts/weather";
import { CountryData } from "../../contracts/country";
export class SubmitActionFailed { }
export class SubmitActionPending { }
export class GetCountryNameActionFailed { }
export class SubmitActionSucceeded {
    constructor(private cityWeatherData: ApiWeatherData) {
    }
    public get Data(): ApiWeatherData {
        return this.cityWeatherData;
    }
}

export class GetCountryName {
    constructor(private countryData: CountryData) {
    }
    public get Country(): CountryData {
        return this.countryData;
    }
}
export class InitGeolocation {
    constructor(private long: number, private lat: number) { }
    public get Long(): number {
        return this.long;
    }
    public get Lat(): number {
        return this.lat;
    }
}
export class GetCityImage {
    constructor(private cityImageUrl: string) {
    }
    public get CityImageUrl(): string {
        return this.cityImageUrl;
    }
}
