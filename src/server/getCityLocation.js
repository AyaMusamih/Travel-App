const request = require('request-promise-native');

const getCityCoordinates = (city, username) => {
  const apiUrl = `http://api.geonames.org/postalCodeSearchJSON?placename=${city}&maxRows=1&username=${username}`;

  return request({ uri: apiUrl, json: true })
    .then((data) => {
      if (!data || !data.postalCodes || data.postalCodes.length === 0) {
        return {
          error: true,
          message: 'City not found. Double-check the spelling of the city name.',
        };
      }
      const { placeName, lat, lng } = data.postalCodes[0];
      return {
        error: false,
        city: placeName,
        latitude: lat,
        longitude: lng,
      };
    })
    .catch((err) => {
      return {
        error: true,
        message: err.message || 'Something went wrong while fetching city data.',
      };
    });
};

module.exports = { getCityCoordinates };
