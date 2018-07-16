import { RootObject } from "../../contracts/weather";

export class SubmitGeolocation {
    constructor(private data: RootObject) {
    }
    public get Data(): RootObject {
        return this.data;
    }
}

export class SubmitGeolocationFailed { }

export class InitGeolocation {
    constructor(private long: number, private lat: number) { }
    public get Long(): number {
        return this.long;
    }
    public get Lat(): number {
        return this.lat;
    }
}
