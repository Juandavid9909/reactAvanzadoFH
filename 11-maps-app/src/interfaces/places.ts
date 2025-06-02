export interface PlacesResponse {
    type:        string;
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    type:       string;
    id:         string;
    geometry:   Geometry;
    properties: Properties;
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    mapbox_id:       string;
    feature_type:    string;
    full_address:    string;
    name:            string;
    name_preferred:  string;
    coordinates:     Coordinates;
    place_formatted: string;
    context:         Context;
}

export interface Context {
    street:    Locality;
    postcode:  Locality;
    locality?: Locality;
    place:     Place;
    region:    Region;
    country:   Country;
}

export interface Country {
    mapbox_id:            string;
    name:                 string;
    wikidata_id:          string;
    country_code:         string;
    country_code_alpha_3: string;
}

export interface Locality {
    mapbox_id: string;
    name:      string;
}

export interface Place {
    mapbox_id:    string;
    name:         string;
    wikidata_id?: string;
}

export interface Region {
    mapbox_id:        string;
    name:             string;
    wikidata_id:      string;
    region_code:      string;
    region_code_full: string;
    alternate?:       Region;
}

export interface Coordinates {
    longitude: number;
    latitude:  number;
}
