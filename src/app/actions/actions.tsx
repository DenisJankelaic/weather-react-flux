import { RootObject } from "../contracts/weather";

export class SubmitActionSucceeded {
    constructor(private data: RootObject) {
    }
    public get Data(): RootObject {
        return this.data;
    }
}
export class SubmitActionFailed { }
export class SubmitActionPending { }

export class SetDataAction {
    constructor(private data: any) {
    }
    public get Data(): any {
        return this.data;
    }
}
