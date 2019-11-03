const Location = require("../../models/Location");
const locate = require("../../util/locate");
const ChatBox = require("../../models/ChatBox");
const User = require("../../models/User");

module.export.getRooms = async (req, res) => {
    try {
        let lat = req.body.lat;
        let long = req.body.long;

        let {
            city
        } = await locate.getAddress(lat, long);

        let region = await Location.findOne({ 
            region : city
        }).exec()

        let regionId = region.regionId;

       // let rooms = await ChatBox.find({ regionId : regionId }).exec();

        let users = await User.find({ regionId : regionId}).lean().exec();

        let roomMap = new Map();
        for (var user of users) {
            let chatName = user.chatName;
            if (roomMap.get(chatName)) {
                roomMap.set(chatName, 1 + roomMap.get(chatName));
            } else {
                roomMap.set(chatName, 1);
            }
        }

        const mapSort = new Map([...roomMap.entries()].sort((a, b) => b[1] - a[1]));

        let rooms = mapSort.keys();

        res.send({
            rooms : rooms
        });
        
    } catch (error) {
        logger.error(`Error in chatbox: ${error.stack}`);
    }
}

module.export.createRoom = async (req, res) => {
    try {
        let lat = req.body.lat;
        let long = req.body.long;
        let chatName = req.body.chatName;

        let {
            city,
            state
        } = await locate.getAddress(lat, long);
        
        let region = await Location.findOne({ region : city}).exec()

        let regionId = region.regionId;

        let chatbox = new ChatBox({
            regionId : regionId,
            chatName : chatName
        })

        await chatbox.save().exec();

    } catch (error) {
        logger.error(`Error in chatbox: ${error.stck}`);
    }
}