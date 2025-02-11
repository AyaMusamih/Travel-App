const axios = require('axios');

const fetchCityImage = (city, apiKey) => {
  const endpoint = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(city)}&image_type=photo`;

  return axios
    .get(endpoint)
    .then((response) => {
      if (response.data.hits && response.data.hits.length > 0) {
        const imageUrl = response.data.hits[0].webformatURL;
        return { image: imageUrl };
      }
      return {
        image: 'https://source.unsplash.com/random/640x480?city,morning,night?sig=2',
      };
    })
    .catch((err) => {
      console.error("Error fetching image:", err);
      return {
        image: 'https://source.unsplash.com/random/640x480?city,morning,night?sig=3',
      };
    });
};

module.exports = { fetchCityImage };
