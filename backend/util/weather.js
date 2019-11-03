const axios = require('axios');
const logger = require('./logger');

const urlStart = 'https://api.openweathermap.org/data/2.5/weather?lat=';
const urlMid = '&lon=';
const urlEnd = '&appid=';
const key = CONFIG.openWeatherApiKey;

const extemeWeather = [202, 212, 232, 502, 504, 602, 622, 711, 762, 781];

module.exports.getWeatherData = async (lat, long) => {
    return new Promise((resolve, reject) => {
        const WEATHER_URL = urlStart.concat(lat, urlMid, long, urlEnd, key);
        axios({
          method: "GET",
          url: WEATHER_URL
        }).then(response => {
            let weatherID = response.data.weather[0].id;
            resolve(extemeWeather.includes(weatherID));
        });
    });
}

module.exports.getCity = async (lat, long) => {
    return new Promise((resolve, reject) => {
      const WEATHER_URL = urlStart.concat(lat, urlMid, long, urlEnd, key);
      axios({
        method: "GET",
        url: WEATHER_URL
      }).then(response => {
          logger.info(lat + ', ' + long);
        let city = response.data.name;
        resolve(city);
      });
    });
};