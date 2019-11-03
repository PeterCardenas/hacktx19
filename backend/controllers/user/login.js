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

        user.save((err, response) => {
            if (!err) {
                res.send({
                    success: true,
                    userId: userId
                });
                logger.info(`Registration API Success`);
            } else {
                res.send({
                  success: false
                });
            }
        });
    } catch (error) {
        logger.error(`Error in registration ${error.stack}`);
    }
}

module.exports.login = async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        let user = await User.findOne({ username : username }).exec();
        if (user == null) {
            res.send({
                success: false
            });
        } else {
            let validate = await user.validatePassword(password);

            res.send({
              success: validate
            });
        }

    } catch (error) {
        logger.error(`Error in login ${error.stack}`);
    }
}