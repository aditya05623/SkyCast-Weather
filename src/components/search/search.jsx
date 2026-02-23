import React, { useState, useEffect, useCallback } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

const DEFAULT_CITY = {
  value: "20.2961 85.8245",
  label: "Bhubaneswar, IN",
};

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  /**
   * 🌍 Detect user location on first load
   */
  useEffect(() => {
    if (!navigator.geolocation) {
      setSearch(DEFAULT_CITY);
      onSearchChange(DEFAULT_CITY);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // Reverse Geocoding using OpenWeather
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
          );

          const data = await response.json();

          if (data && data.length > 0) {
            const detectedCity = {
              value: `${lat} ${lon}`,
              label: `${data[0].name}, ${data[0].country}`,
            };

            setSearch(detectedCity);
            onSearchChange(detectedCity);
          } else {
            setSearch(DEFAULT_CITY);
            onSearchChange(DEFAULT_CITY);
          }
        } catch (error) {
          console.error("Location detection failed:", error);
          setSearch(DEFAULT_CITY);
          onSearchChange(DEFAULT_CITY);
        }
      },
      () => {
        // Permission denied
        setSearch(DEFAULT_CITY);
        onSearchChange(DEFAULT_CITY);
      }
    );
  }, [onSearchChange]);

  /**
   * 🔍 City search API
   */
  const loadOptions = useCallback(async (inputValue) => {
    if (!inputValue || inputValue.trim() === "") {
      return { options: [] };
    }

    try {
      const response = await fetch(
        `${GEO_API_URL}?input=${inputValue}`,
        geoApiOptions
      );

      const result = await response.json();

      if (!result?.data) return { options: [] };

      return {
        options: result.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      console.error("Error fetching city data:", error);
      return { options: [] };
    }
  }, []);

  const handleOnChange = (selectedOption) => {
    setSearch(selectedOption);
    onSearchChange(selectedOption);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      isClearable
      defaultOptions={false}
      classNamePrefix="react-select"
    />
  );
};

export default Search;