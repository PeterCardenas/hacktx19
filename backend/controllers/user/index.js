const express = require("express");
const router = express.Router();
const login = require('./login');
const chatbox = require('./userbox');

router.post('/login', login.login);
router.post('/register', login.registration);
router.post('/update-chatbox', chatbox.enterBox);

module.exports = router;