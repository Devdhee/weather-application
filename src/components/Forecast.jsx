const Forecast = ({ data }) => {
  const dailyData = data.list.filter((reading) =>
    reading.dt_txt.includes("12:00:00")
  );

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold dark:text-white">
        5-Day Forecast
      </h2>
      <div className="flex flex-wrap gap-4">
        {dailyData.map((day, index) => (
          <div
            key={index}
            className="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-700"
          >
            <p className="font-bold dark:text-white">
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="w-12 h-12 mx-auto"
            />
            <p className="text-sm dark:text-gray-300">
              {Math.round(day.main.temp)}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
