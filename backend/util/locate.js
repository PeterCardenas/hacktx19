const logger = require("./logger");
const googleMapsClient = require("@google/maps").createClient({
  key: CONFIG.googleMapsApiKey
});

module.exports.getAddress = async (lat, long) => {
  return new Promise((resolve, reject) => {
    googleMapsClient.reverseGeocode(
      {
        latlng: [lat, long],
        result_type:
          "administrative_area_level_2|administrative_area_level_1|locality"
      },
      (err, response) => {
        console.log(JSON.stringify(response.json));
        if (err == null) {
          let res = response.json.results[0];
          let city = res.address_components[0].long_name;
          resolve({
            city: city
          });
        } else if (err.json) {
          logger.error(err.json.error_message);
          reject();
        } else {
          logger.error("Google maps api broke lol");
          reject();
        }
      }
    );
  });
};
