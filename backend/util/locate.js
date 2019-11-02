const logger = require('./logger');
const googleMapsClient = require("@google/maps").createClient({
  key: CONFIG.googleMapsApiKey
});

module.exports.getAddress = async (lat, long) => {
    return new Promise((resolve, reject) => {
        googleMapsClient.reverseGeocode({
            latlng: [lat, long],
            result_type: "administrative_area_level_1"
        }, (err, response) => {
            if (!err) {
                let state =
                  response.json.results[0].address_components[0].long_name;
                resolve(state);
            } else if (err.json) {
                logger.error(err.json.error_message);
                reject();
            } else {
                logger.error('Google maps api broke lol');
                reject();
            }
        });
    });
};