import { Item } from "./city-api-search-contracts";

export interface CityWeatherData {
    city: string;
    country: string;
    temperature: number;
    humidity: number;
    wind: number;
    description: string;
    weather: string;
    lat: number;
    long: number;
    imageArray: Item[];
    index: number;
    icon: string;
}
