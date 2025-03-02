# Travel App

## Overview
The **Travel App** is a web application that helps users plan their trips by providing location details, weather forecasts, and images of their selected destinations. Users can enter a city name and travel date, and the app will fetch relevant information using multiple APIs.

## Features
- Get the number of days remaining until the selected travel date.
- Fetch location coordinates for a city using the GeoNames API.
- Retrieve current and forecasted weather data from the Weatherbit API.
- Display a relevant city image from the Pixabay API.

## Technologies Used
- **Frontend:** HTML, CSS, SCSS, JavaScript
- **Backend:** Node.js, Express.js
- **Testing:** Jest
- **APIs:**
  - [GeoNames API](http://www.geonames.org/)
  - [Weatherbit API](https://www.weatherbit.io/)
  - [Pixabay API](https://pixabay.com/)
- **Additional Libraries:** Axios, Request-Promise-Native, Dotenv, Cors


```
## Installation and Setup

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v14 or later)
- NPM (v6 or later)

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd travel-app
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the project root and add:
   ```sh
   USERNAME_KEY=your_geonames_username
   WEATHER_KEY=your_weatherbit_api_key
   PICTURE_KEY=your_pixabay_api_key
   PORT=8000
   ```
4. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:8000`.

5. **Build for production:**
   ```sh
   npm run build
   ```

6. **Run tests:**
   ```sh
   npm test
   ```

## API Endpoints
| Endpoint          | Method | Description |
|------------------|--------|-------------|
| `/api/location`  | POST   | Fetches coordinates for a given city |
| `/api/weather`   | POST   | Retrieves weather data for a city based on latitude, longitude, and number of days |
| `/api/picture`   | POST   | Fetches an image of the city |

## Author
- **Aya Musamih**

## License
This project is licensed under the **MIT License**.

## Acknowledgments
- Thanks to [GeoNames](http://www.geonames.org/), [Weatherbit](https://www.weatherbit.io/), and [Pixabay](https://pixabay.com/) for providing free APIs used in this project.

---

Enjoy planning your trips with **Travel App**!

