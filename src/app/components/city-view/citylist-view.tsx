import * as React from "react";
import { CityListContainer } from "../../containers/city-list/city-list-container";
export class CityListView extends React.Component<{}> {
    public render(): JSX.Element {
        return (
                <CityListContainer/>
            );
    }
}
