const Message = require("../../models/Message");
const Location = require("../../models/Location");
const logger = require('../../util/logger');
const locate = require("../../util/locate");
const messageCensor = require ("../../controllers/message/messageCensor");

module.exports.getMessages = async (req,res) => {
    try {
        let lat = req.query.lat;
        let long = req.query.long;
        let date = parseInt(req.query.date, 10);
        let dateLastCalled = parseInt(req.query.dateLastCalled, 10);
        let chatName = req.query.chatName;
        let messages;

        let {
            city
        } = await locate.getAddress(lat, long);

        let region = await Location.findOne({
            region : city
        }).exec();


        // if (dateLastCalled != 0) {
        //     date = new Date(date);
        //     dateLastCalled = new Date(dateLastCalled);
        //     messages = await Message.find({ regionId : region.regionId, chatName : chatName, date : { $gt : dateLastCalled, $lt : date }}).sort({
        //         date : 1
        //     }).exec();
        // } else {
        //     messages = await Message.find({ regionId : region.regionId, chatName : chatName }).sort({
        //         date : 1
        //     }).exec();
        // }

        messages = await Message.find({
          regionId: region.regionId,
          chatName: chatName
        })
          .sort({
            date: 1
          })
          .exec();

        let parseMessages = messages.map(msg => {
            return msg.message;
        });

        res.send ({
            messages : parseMessages
        })

    } catch (error) {
        logger.error(`Error in messages get: ${error.stack}`);
    }
}

module.exports.createMessage = async (req, res) => {
    try {
        let message = messageCensor.censorMessage(req.body.message);
        let userId = req.body.userId;
        let lat = req.body.lat;
        let long = req.body.long;
        let date = req.body.date;
        let chatName = req.body.chatName;

        let {
            city
        } = await locate.getAddress(lat, long);

        let region = await Location.findOne({ region : city}).exec()

        let regionId = region.regionId;

        let newMessage = new Message({
            regionId : regionId,
            userId : userId,
            message : message,
            date : date,
            chatName : chatName
        });

        await newMessage.save();
        res.send({
            success: true
        });

    } catch (error) {
        logger.error(`Error in messages create: ${error.stack}`);
    }
}