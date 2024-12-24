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
    <div className="flex flex-col justify-center min-h-screen px-4 py-6 transition-colors duration-200 bg-gray-100 sm:py-12 dark:bg-gray-900">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 transition-colors duration-200 bg-white shadow-lg dark:bg-gray-800 sm:rounded-3xl sm:p-20">
          <div className="max-w-xl mx-auto">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="py-8 space-y-4 text-base leading-6 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                <h1 className="mb-6 text-3xl font-extrabold text-center text-gray-900 transition-colors duration-200 dark:text-white">
                  David's Weather App
                </h1>
                <form onSubmit={handleSubmit} className="mb-4">
                  <div className="flex items-center py-2 border-b border-teal-500 dark:border-teal-400">
                    <input
                      className="w-full px-2 py-1 mr-3 leading-tight text-gray-700 transition-colors duration-200 bg-transparent border-none appearance-none dark:text-gray-300 focus:outline-none"
                      type="text"
                      placeholder="Enter city name"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      aria-label="City name"
                    />
                    <button
                      className="flex-shrink-0 px-2 py-1 text-sm text-white transition-colors duration-200 bg-teal-500 border-4 border-teal-500 rounded hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-800 dark:border-teal-600 hover:border-teal-700 dark:hover:border-teal-800"
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                </form>
                {error && (
                  <div
                    className="relative px-4 py-3 text-red-700 transition-colors duration-200 bg-red-100 border border-red-400 rounded dark:bg-red-900 dark:border-red-600 dark:text-red-300"
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
