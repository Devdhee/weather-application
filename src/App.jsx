import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

const API_KEY = import.meta.env.VITE_API_KEY;

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const fetchWeather = async () => {
    try {
      setError(null);
      setWeatherData(null);
      setForecastData(null);

      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!currentResponse.ok) {
        throw new Error("Could not find city");
      }

      const currentData = await currentResponse.json();
      setWeatherData(currentData);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!forecastResponse.ok) {
        throw new Error("Could not fetch forecast data");
      }

      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20 transition-colors duration-200">
          <div className="max-w-xl mx-auto">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white transition-colors duration-200">
                  David's Weather App
                </h1>
                <form onSubmit={handleSubmit} className="mb-4">
                  <div className="flex items-center border-b border-teal-500 dark:border-teal-400 py-2">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none transition-colors duration-200"
                      type="text"
                      placeholder="Enter city name"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      aria-label="City name"
                    />
                    <button
                      className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-800 border-teal-500 dark:border-teal-600 hover:border-teal-700 dark:hover:border-teal-800 text-sm border-4 text-white py-1 px-2 rounded transition-colors duration-200"
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                </form>
                {error && (
                  <div
                    className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded relative transition-colors duration-200"
                    role="alert"
                  >
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}
                {weatherData && <CurrentWeather data={weatherData} />}
                {forecastData && <Forecast data={forecastData} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WeatherApp />
    </ThemeProvider>
  );
}
