import { JSX, useEffect, useReducer } from "react";

import { getUserLocation } from "../../helpers";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { Feature, PlacesResponse } from "../../interfaces/places";
import { searchApi } from "../../apis";

export interface PlacesState {
    isLoading: boolean;
    isLoadingPlaces: boolean;
    places: Feature[];
    userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    isLoadingPlaces: false,
    places: [],
    userLocation: undefined,
};

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

    useEffect(() => {
        getUserLocation()
            .then((lngLat) => dispatch({
                type: "setUserLocation",
                payload: lngLat,
            }));
    }, []);

    const searchPlacesByTerm = async(query: string): Promise<Feature[]> => {
        if(query.length === 0) {
            dispatch({ type: "setPlaces", payload: [] });

            return [];
        }

        if(!state.userLocation) throw new Error("No hay ubicación del usuario");

        dispatch({ type: "setLoadingPlaces" });

        const resp = await searchApi.get<PlacesResponse>(`/forward`, {
            params: {
                proximity: state.userLocation.join(","),
                q: query,
            }
        });

        dispatch({ type: "setPlaces", payload: resp.data.features });

        return resp.data.features;
    }

    return (
        <PlacesContext.Provider value={{
            ...state,
            searchPlacesByTerm,
        }}>
            { children }
        </PlacesContext.Provider>
    );
};