import { ApiWeatherData } from "../../contracts/weather";

export class SubmitGeolocation {
    constructor(private currentLocationData: ApiWeatherData) {
    }
    public get Data(): ApiWeatherData {
        return this.currentLocationData;
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

export class SubmitGeolocationFailed { }
