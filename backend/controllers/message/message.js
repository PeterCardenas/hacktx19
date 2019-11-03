const Message = require("../../models/Message");
const Location = require("../../models/Location");
const locate = require("../../util/locate");

module.exports.getMessages = async (req,res) => {
    try {
        let lat = req.params.lat;
        let long = req.params.long;
        let date = req.params.date;
        let dateLastCalled = req.params.dateLastCalled;
        let messages;

        let {
            city,
            state
        } = await locate.getAddress(lat, long);

        let region = await Location.findOne({ region : city}).exec()

        let regionId = region.regionId;

        if (dateLastCalled) {
            messages = await Message.find({ regionId : regionId, date : { $gt : dateLastCalled, $lt : date }}).sort({
                date : -1
            }).exec()
        } else {
            messages = await Message.find({ regionId : regionId}).sort({
                date : -1
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

        let {
            city,
            state
        } = await locate.getAddress(lat, long);

        let region = await Location.findOne({ region : city}).exec()

        let regionId = region.regionId;


        let newMessage = new Message({
            regionId : regionId,
            userId : userId,
            message : message,
            date : date
        })

        await newMessage.save();
        res.send({
            success: true
        });

    } catch (error) {
        logger.error(`Error in messages: ${error.stack}`);
    }
}