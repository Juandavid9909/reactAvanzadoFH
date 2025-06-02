import { ChangeEvent, useContext, useRef } from "react";

import { PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
    const { searchPlacesByTerm } = useContext(PlacesContext);

    const debounceRef = useRef<NodeJS.Timeout>(null);

    const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
        if(debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value);
        }, 350);
    };

    return (
        <div className="search-container">
            <input
                className="form-control"
                placeholder="Buscar lugar..."
                onChange={ onQueryChanged }
                type="text"
            />

            <SearchResults />
        </div>
    );
};