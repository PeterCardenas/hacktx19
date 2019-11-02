const User = require('../../models/User');
const logger = require('../../util/logger');
const uuid = require('uuid/v4');

module.exports.registration = async (req, res) => {
    try {

        let userId = uuid();
        let username = req.body.username;
        let password = req.body.password;
        let name = req.body.name;
        let age = req.body.age;
        let sex = req.body.sex;

        let user = new User ({
            userId : userId,
            username : username,
            password : password,
            name : name,
            age : age,
            sex : sex
        });

        user.save().exec();
        
    } catch (error) {
        logger.error(`Error in registration ${error.stack}`);
    }
}

module.exports.login = async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        let user = await User.findOne({ username : username }).exec();

        let validate = await user.validatePassword(password);

        res.send({
            success : validate
        })

    } catch (error) {
        logger.error(`Error in login ${error.stack}`);
    }
}