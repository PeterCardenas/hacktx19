const axios = require('axios');
const logger = require('./logger');

const WEATHER_URL = '';

module.exports.getWeatherData = async () => {
    return new Promise((resolve, reject) => {
        axios({
          method: "GET",
          url: WEATHER_URL
        }).then(response => {
            logger.info(JSON.stringify(response));
        });
    });
}