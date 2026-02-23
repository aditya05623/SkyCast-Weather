import { useState, useCallback } from "react";
import Search from "./components/search/search.jsx";
import CurrentWeather from "./components/current-weather/current-weather.jsx";
import Forecast from "./components/forecast/forecast.jsx";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api.js";
import "./App.css";
import Header from "./components/header/header.jsx";


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnSearchChange = useCallback((searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    setCurrentWeather(null);
    setForecast(null);
    setLoading(true);

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async ([weatherRes, forecastRes]) => {
        const weatherResponse = await weatherRes.json();
        const forecastResponse = await forecastRes.json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="container">
      <Header />

      <Search onSearchChange={handleOnSearchChange} />

      {loading && <p className="loading">Loading weather data...</p>}

      {currentWeather && !loading && (
        <CurrentWeather data={currentWeather} />
      )}

      {forecast && !loading && (
        <Forecast data={forecast} />
      )}
    </div>
  );
}

export default App;