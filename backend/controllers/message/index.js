const express = require("express");
const message = require('./message');
const router = express.Router();

router.get('/get', message.getMessages);
router.post('/create', message.createMessage);

module.exports = router;