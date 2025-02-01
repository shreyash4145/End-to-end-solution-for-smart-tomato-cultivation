import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Weather = () => {
  const [city, setCity] = useState("Pune");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "fa84c0f8370b011189a8d72d1d2cf8de";

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      alert("No weather data found. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.elements.cityInput.value.trim();
    if (searchInput) {
      fetchWeather(searchInput);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full text-white">
          <form onSubmit={handleSearch} className="flex mb-6">
            <input
              type="text"
              name="cityInput"
              placeholder="Search City"
              className="flex-1 p-3 rounded-l-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 p-3 rounded-r-lg hover:bg-yellow-600"
            >
              Search
            </button>
          </form>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : weatherData ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{weatherData.name}</h2>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
                className="mx-auto mb-2"
              />
              <p className="text-5xl font-bold">{weatherData.main.temp}°C</p>
              <p className="capitalize text-lg">
                {weatherData.weather[0].description}
              </p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} km/h</p>
            </div>
          ) : (
            <p className="text-center text-red-500">
              Weather data unavailable.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
