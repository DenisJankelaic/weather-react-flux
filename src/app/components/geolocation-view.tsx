import * as React from "react";
import { GeolocationContainer } from "../containers/geolocation-container";
import { ActionsCreators } from "../actions/action-creators";
export class GeolocationView extends React.Component<{}> {
    public render(): JSX.Element {
        return (
                <GeolocationContainer/>
            );
    }
}
