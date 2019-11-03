const Message = require("../../models/Message");
const Location = require("../../models/Location");
const locate = require("../../util/locate");

module.exports.getMessages = async (req,res) => {
    try { 
        let lat = req.body.lat;
        let long = req.body.long;
        let date = req.body.date;
        let dateLastCalled = req.body.dateLastCalled;
        let chatName = req.body.chatName;
        let messages;

        let {
            city
        } = await locate.getAddress(lat, long);

        let region = await Location.findOne({ 
            region : city
        }).exec()

        let regionId = region.regionId;

        if (dateLastCalled) {
            messages = await Message.find({ regionId : regionId, chatName : chatName, date : { $gt : dateLastCalled, $lt : date }}).sort({
                date : 1
            }).exec()
        } else {
            messages = await Message.find({ regionId : regionId, chatName : chatName }).sort({
                date : 1
            }).exec()
        }

        let parseMessages = messages.map(msg => {
            return msg.message;
        })

        res.send ({
            messages : parseMessages
        })
        
    } catch (error) {
        logger.error(`Error in messages: ${error.stack}`);
    }
}

module.exports.createMessage = async (req, res) => {
    try {
        let message = req.body.message;
        let userId = req.body.userId;
        let lat = req.body.lat;
        let long = req.body.long;
        let date = req.body.date;
        let chatName = req.body.chatName;

        let {
            city,
            state
        } = await locate.getAddress(lat, long);
        
        let region = await Location.findOne({ region : city}).exec()

        let regionId = region.regionId;

        let message = new Message({
            regionId : regionId,
            userId : userId,
            message : message,
            date : date,
            chatName : chatName
        })

        await message.save();

    } catch (error) {
        logger.error(`Error in messages: ${error.stack}`);
    }
}