const axios = require('axios');

const fetchWeatherData = (latitude, longitude, days, apiKey) => {
  if (days < 0) {
    return { error: true, message: "Invalid day input. Please enter a valid day." };
  }

  const getCurrentWeather = () => {
    const currentWeatherUrl = `http://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&units=M&key=${apiKey}`;
    return axios.get(currentWeatherUrl);
  };

  const getForecastWeather = () => {
    const forecastWeatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&units=M&days=${days}&key=${apiKey}`;
    return axios.get(forecastWeatherUrl);
  };

  const handleWeatherResponse = (data) => {
    const { weather, temp } = data[0];
    const { description } = weather;
    return { description, temp };
  };

  const handleForecastResponse = (data) => {
    const { weather, temp, app_max_temp, app_min_temp } = data[data.length - 1];
    const { description } = weather;
    return { description, temp, app_max_temp, app_min_temp };
  };

  // Fetching weather data
  if (days <= 7) {
    return getCurrentWeather()
      .then((response) => {
        const weatherData = handleWeatherResponse(response.data.data);
        return weatherData;
      })
      .catch((error) => {
        return { error: true, message: "An error occurred while fetching weather data." };
      });
  } else {
    return getForecastWeather()
      .then((response) => {
        const weatherData = handleForecastResponse(response.data.data);
        return weatherData;
      })
      .catch((error) => {
        return { error: true, message: "An error occurred while fetching forecast data." };
      });
  }
};

module.exports = { fetchWeatherData };
