const axios = require('axios');
const logger = require('./logger');

const urlStart = 'https://api.openweathermap.org/data/2.5/weather?q=';
const urlEnd = '&appid=';
const key = CONFIG.openWeatherApiKey;

const extemeWeather = [202, 212, 232, 502, 504, 602, 622, 711, 762, 781];

module.exports.getWeatherData = async (city) => {
    return new Promise((resolve, reject) => {
        const WEATHER_URL = urlStart.concat(city, urlEnd, key);
        axios({
          method: "GET",
          url: WEATHER_URL
        }).then(response => {
            var weatherID = response.data.weather[0].id;
            logger.info(weatherID);
            resolve(extemeWeather.includes(weatherID));
        });
    });
}