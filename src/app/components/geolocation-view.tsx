import * as React from "react";
import { GeolocationContainer } from "../containers/geolocation-container";
export class GeolocationView extends React.Component<{}> {
    public render(): JSX.Element {
        return (
                <GeolocationContainer/>
            );
    }
}
