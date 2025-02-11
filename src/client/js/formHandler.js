import { calculateRemainingDays } from "./RemainingDays";
import { getWeather } from "./getWeather";
import { getCity } from "./getCity";
import { getCityPicture } from "./getCityPicture";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form").addEventListener("submit", submitTrip);
});

async function submitTrip(event) {
    event.preventDefault();

    const destination = document.getElementById("city").value.trim();
    const tripDate = document.getElementById("date").value;
    
    resetErrors();

    if (!validateForm(destination, tripDate)) return;

    try {
        const locationData = await getCity(destination);
        if (!locationData || locationData.error) {
            return showError("city_error", "Invalid city. Please try again.");
        }

        const { lat, lng } = locationData;
        const countdown = calculateRemainingDays(tripDate);

        const weatherData = await getWeather(lat, lng, countdown);
        if (!weatherData || weatherData.error) {
            return showError("date_error", "Unable to fetch weather. Try a different date.");
        }

        const imageData = await getCityPicture(destination);
        displayTripDetails(countdown, destination, weatherData, imageData);
    } catch (error) {
        console.error("Error fetching trip details:", error);
    }
}

function displayTripDetails(days, location, weather, image) {
    document.querySelector(".trip-info").innerHTML = `
        <h3>Your Trip to ${location}</h3>
        <p>Days until departure: ${days}</p>
        <p>Expected weather: ${weather.description}, ${weather.temp}°C</p>
        <img src="${image.image || "fallback.jpg"}" alt="View of ${location}">
    `;
    document.getElementById("details").style.display = "block";
}

function validateForm(city, date) {
    if (!city) {
        return showError("city_error", "City name is required.");
    }
    if (!date || calculateRemainingDays(date) < 0) {
        return showError("date_error", "Enter a valid future date.");
    }
    return true;
}

function resetErrors() {
    document.getElementById("city_error").textContent = "";
    document.getElementById("date_error").textContent = "";
}

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
    return false;
}
