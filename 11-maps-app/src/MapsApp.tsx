import { HomeScreen } from "./screens";
import { PlacesProvider } from "./context";

import "./styles.css";

export const MapsApp = () => {
    return (
        <PlacesProvider>
            <HomeScreen />
        </PlacesProvider>
    );
};