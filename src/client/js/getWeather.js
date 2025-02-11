import axios from 'axios';

const fetchWeatherData = async (longitude, latitude, remainingDays) => {
    try {
        const { data } = await axios.post('http://localhost:8000/getWeather', {
            lat: latitude,
            lng: longitude,
            remainingDays
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export { fetchWeatherData };
