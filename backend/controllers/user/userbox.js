const User = require('../../models/User');
const logger = require('../../util/logger');

module.exports.enterBox = async (req, res) => {
    try {
        let userId = req.body.userId;
        let chatName = req.body.chatName;

        let user = await User.findOne({ userId : userId }).exec();

        user.chatName = chatName;
        await user.save();
        res.send({
            success: true
        });
        //alternate
        //user.updateOne({userId : userId}, {$set: {chatName : chatBox}})
    } catch (error) {
        logger.error(`Error in registration ${error.stack}`);
    }
}