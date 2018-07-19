import { ApiWeatherData } from "../../contracts/weather";

export class SubmitActionFailed { }
export class SubmitActionPending { }

export class SubmitActionSucceeded {
    constructor(private cityWeatherData: ApiWeatherData) {
    }
    public get Data(): ApiWeatherData {
        return this.cityWeatherData;
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
