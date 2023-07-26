const axios = require("axios");

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibmVsdS1kcmFnYW4iLCJhIjoiY2xrOWZnbXpvMGkzNDNlbXkxczI4bG0xNyJ9.d6V-lhV1nDD41ExPGiteLg";

async function getCoordinatesFromAddress(address) {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;

  try {
    const response = await axios.get(url);
    const { features } = response.data;

    if (features && features.length > 0) {
      const { center } = features[0];
      const [longitude, latitude] = center;
      return { latitude, longitude };
    } else {
      throw new Error("Address not found");
    }
  } catch (error) {
    throw new Error("Error while geocoding address");
  }
}

module.exports = { getCoordinatesFromAddress };
