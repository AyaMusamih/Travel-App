const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import API utility functions
const { fetchCityCoordinates } = require('./getCityLocation');
const { fetchWeatherData } = require('./getWeather');
const { fetchCityImage } = require('./getPicture');

// Initialize Express app
const server = express();

// Environment variables (API keys)
const geonameAPIKey = process.env.USERNAME_KEY;
const weatherAPIKey = process.env.WEATHER_KEY;
const pixabayAPIKey = process.env.PICTURE_KEY;

// Middleware setup
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Serve static content from 'dist' folder
server.use(express.static(path.join(__dirname, 'dist')));

// Routes for the app
server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Fetch location coordinates based on city name
server.post('/api/location', async (req, res) => {
  const { city } = req.body;
  
  try {
    const locationData = await fetchCityCoordinates(city, geonameAPIKey);
    return res.json(locationData);
  } catch (error) {
    console.error("Location fetch error:", error);
    return res.status(500).json({ error: 'Unable to fetch location data' });
  }
});

// Fetch current weather data for specific coordinates and days
server.post('/api/weather', async (req, res) => {
  const { latitude, longitude, days } = req.body;

  if (days < 0 || days > 7) {
    return res.status(400).json({ error: 'Please provide a valid number of days (1-7)' });
  }

  try {
    const weather = await fetchWeatherData(latitude, longitude, days, weatherAPIKey);
    return res.json(weather);
  } catch (error) {
    console.error("Weather fetch error:", error);
    return res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

// Fetch a picture related to the city
server.post('/api/picture', async (req, res) => {
  const { city } = req.body;

  try {
    const picture = await fetchCityImage(city, pixabayAPIKey);
    return res.json(picture);
  } catch (error) {
    console.error("Picture fetch error:", error);
    return res.status(500).json({ error: 'Unable to fetch city picture' });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
