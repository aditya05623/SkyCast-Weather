export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
  },
};

export const GEO_API_URL =
  "https://city-search2.p.rapidapi.com/city/autocomplete";

export const WEATHER_API_URL =
  "https://api.openweathermap.org/data/2.5";

export const WEATHER_API_KEY =
  import.meta.env.VITE_WEATHER_API_KEY;