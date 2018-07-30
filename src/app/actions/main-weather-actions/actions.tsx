import { ApiWeatherData } from "../../contracts/weather";
import { CountryData } from "../../contracts/country";
import { Item } from "../../contracts/city-api-search-contracts";

export class SubmitActionFailed { }
export class SubmitActionPending { }
export class GetCountryNameActionFailed { }
export class ChangeMainWeatherButton { }
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
    constructor(private cityImageArray: Item[]) {
    }
    public get CityImageArray(): Item[] {
        return this.cityImageArray;
    }
}
