const Location = require("../../models/Location");
const locate = require("../../util/locate");
const ChatBox = require("../../models/ChatBox");
const User = require("../../models/User");
const logger = require('../../util/logger');
const weather = require("../../util/weather");

module.exports.getRooms = async (req, res) => {
    try {
        let lat = parseFloat(req.query.lat);
        let long = parseFloat(req.query.long);
        let {city} = await locate.getAddress(lat, long);
        logger.info(city);

        let region = await Location.findOne({
            region : city
        }).exec();

        let regionId = region.regionId;

        let users = await User.find({ regionId : regionId}).lean().exec();

        let roomMap = {};
        for (var user of users) {
            let chatName = user.chatName;
            if (roomMap[chatName]) {
                roomMap[chatName] += 1;
            } else {
                roomMap[chatName] = 1;
            }
        }

        let rooms = Object.keys(roomMap);
        rooms.sort((room1, room2) => roomMap[room2] - roomMap[room1]);
        let isExtreme = weather.getWeatherData(lat, long);

        // set extreme weather as top priority chatbox regardless of popularity
        if (isExtreme) {
          roomMap["EMERGENCY"] = 9007199254740991;
        }

        res.send({
            rooms : rooms
        });

    } catch (error) {
        logger.error(`Error in chatbox get: ${error}`);
    }
}

module.exports.createRoom = async (req, res) => {
    try {
        let lat = req.body.lat;
        let long = req.body.long;
        let chatName = req.body.chatName;

        let {
            city
        } = await locate.getAddress(lat, long);

        let region = await Location.findOne({ region : city}).exec();

        let regionId = region.regionId;

        let chatbox = new ChatBox({
            regionId : regionId,
            chatName : chatName
        })

        await chatbox.save();

    } catch (error) {
        logger.error(`Error in chatbox create: ${error.stck}`);
    }
}