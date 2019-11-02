const axios = require('axios');
const logger = require('./logger');

const urlStart = 'https://api.openweathermap.org/data/2.5/weather?q=';
const urlEnd = '&appid=7b8dd6f51a99f8ed5ac07e600d8e3aab';

const extemeWeather = [202, 212, 232, 502, 504, 602, 622, 711, 762, 781];

module.exports.getWeatherData = async (city) => {
    return new Promise((resolve, reject) => {
        const WEATHER_URL = urlStart.concat(city, urlEnd);
        axios({
          method: "GET",
          url: WEATHER_URL
        }).then(response => {
            var weatherID = response.data.weather[0].id;
            logger.info(weatherID);
            if (extemeWeather.includes(weatherID)) {
                logger.info("Extreme");
            }
        });
    });
}