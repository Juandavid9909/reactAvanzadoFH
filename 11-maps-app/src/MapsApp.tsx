import { HomeScreen } from "./screens";
import { MapProvider, PlacesProvider } from "./context";

import "./styles.css";

export const MapsApp = () => {
    return (
        <PlacesProvider>
            <MapProvider>
                <HomeScreen />
            </MapProvider>
        </PlacesProvider>
    );
};