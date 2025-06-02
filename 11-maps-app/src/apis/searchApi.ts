import axios from "axios";

const searchApi = axios.create({
    baseURL: "https://api.mapbox.com/search/geocode/v6",
    params: {
        limit: 5,
        language: "es",
        access_token: process.env.REACT_APP_MAPBOX_TOKEN,
    }
});

export default searchApi;