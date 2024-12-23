const CurrentWeather = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        {data.name}, {data.sys.country}
      </h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold dark:text-white">
            {Math.round(data.main.temp)}°C
          </p>
          <p className="text-gray-500 dark:text-gray-300">
            {data.weather[0].description}
          </p>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-20 h-20"
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 dark:text-gray-300">Humidity</p>
          <p className="font-bold dark:text-white">{data.main.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-300">Wind Speed</p>
          <p className="font-bold dark:text-white">{data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
