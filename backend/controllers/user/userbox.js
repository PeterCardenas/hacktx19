const User = require('../../models/User');
const logger = require('../../util/logger');

module.exports.enterBox = async (req, res) => {
    try {
        let userId = req.body.userId;
        let chatBox = req.body.chatBox;

        let user = await User.findOne({ userId : userId }).exec();

        user.chatName = chatBox;
        await user.save();

        //alternate
        //user.updateOne({userId : userId}, {$set: {chatName : chatBox}})
    } catch (error) {
        logger.error(`Error in registration ${error.stack}`);
    }
}