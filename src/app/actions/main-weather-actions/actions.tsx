import { RootObject } from "../../contracts/weather";

export class SubmitActionFailed { }
export class SubmitActionPending { }
export class SubmitActionSucceeded {
    constructor(private data: RootObject) {
    }
    public get Data(): RootObject {
        return this.data;
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
export class ChangeSelectionState {
    constructor(private city: string) { }
    public get City(): string {
        return this.city;
    }
}

export class ChangeState {}
